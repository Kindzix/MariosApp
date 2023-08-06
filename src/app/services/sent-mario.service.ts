import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SentMario, SentMarioPayload } from '../interfaces/sent-mario';

@Injectable({
  providedIn: 'root',
})
export class SentMarioService {
  private readonly sendMariosUrl = '/api/marios/sent/all';
  private readonly sentMariosUrl = '/api/marios/sent';
  private readonly receivedMariosUrl = '/api/marios/received';
  private readonly sentMarioAddUrl = '/api/marios/send';
  private sentMarioData: SentMario[] = [];
  private sentMarios$ = new BehaviorSubject<SentMario[]>([]);
  private receivedMarios$ = new BehaviorSubject<SentMario[]>([]);

  constructor(private http: HttpClient) {}

  fetchSentMarios(senderUuid: string = 'af6b2daf-e36c-43d5-82e5-b310033e49bc') {
    return this.http.get<SentMario[]>(`${this.sentMariosUrl}/${senderUuid}`).subscribe((data) => {
      this.sentMarioData = data;
      this.sentMarios$.next(data);
    });
  }

  fetchReceivedMarios(recipientUuid: string = 'af6b2daf-e36c-43d5-82e5-b310033e49bc') {
    return this.http.get<SentMario[]>(`${this.receivedMariosUrl}/${recipientUuid}`).subscribe((data) => {
      this.sentMarioData = data;
      this.receivedMarios$.next(data);
    });
  }

  addSentMarios(payload: SentMarioPayload) {
    return this.http.post<SentMario>(this.sentMarioAddUrl, payload).subscribe((data) => {
      this.sentMarioData.push(data);
      this.sentMarios$.next([...this.sentMarioData]);
      this.receivedMarios$.next([...this.sentMarioData]);
    });
  }

  get sentMarios(): Observable<SentMario[]> {
    if (this.sentMarioData.length === 0) {
      this.fetchSentMarios();
    }
    return this.sentMarios$.asObservable();
  }

  get receivedMarios(): Observable<SentMario[]> {
    if (this.sentMarioData.length === 0) {
      this.fetchReceivedMarios();
    }
    return this.receivedMarios$.asObservable();
  }
}
