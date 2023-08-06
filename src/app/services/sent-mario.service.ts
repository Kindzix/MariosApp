import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {SentMario, SentMarioPayload} from '../interfaces/sent-mario';

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

  constructor(private http: HttpClient) {}

  get sentMarios(): Observable<SentMario[]> {
    if (this.sentMarioData.length === 0) {
      this.fetchSendMarios();
    }
    return this.sentMarios$.asObservable();
  }

  fetchSendMarios() {
    return this.http.get<SentMario[]>(this.sendMariosUrl).subscribe((data) => {
      this.sentMarioData = data;
      this.sentMarios$.next(data);
    });
  }

  fetchSentMarios(senderUuid: string) {
    return this.http.get<SentMario[]>(`${this.sentMariosUrl}/${senderUuid}`)
      .subscribe((data) => {
        this.sentMarioData = data;
        this.sentMarios$.next(data);
        console.log(`Fetched ${data.length} sent Marios.`);
      });
  }

  fetchReceivedMarios(recipientUuid: string) {
    return this.http.get<SentMario[]>(`${this.receivedMariosUrl}/${recipientUuid}`)
      .subscribe((data) => {
        this.sentMarioData = data;
        this.sentMarios$.next(data);
        console.log(`Fetched ${data.length} received Marios.`);
      });
  }

  addSentMarios(payload: SentMarioPayload ) {
    return this.http.post<SentMario>(this.sentMarioAddUrl, payload).subscribe((data) => {
      this.sentMarioData.push(data);
      this.sentMarios$.next([...this.sentMarioData]);
    });
  }
}
