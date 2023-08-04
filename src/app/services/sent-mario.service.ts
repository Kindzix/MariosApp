import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {SentMario, SentMarioPayload} from '../interfaces/sent-mario';

@Injectable({
  providedIn: 'root',
})
export class SentMarioService {
  private readonly sentMarioUrl = '/api/marios/send';
  private readonly sentMarioAllUrl = '/api/marios/sent/all';
  private sentMarioData: SentMario[] = [];
  private sentMarios$ = new BehaviorSubject<SentMario[]>([]);

  constructor(private http: HttpClient) {}

  get sentMarios(): Observable<SentMario[]> {
    if (this.sentMarioData.length === 0) {
      this.fetchSentMarios();
    }
    return this.sentMarios$.asObservable();
  }

  fetchSentMarios() {
    return this.http.get<SentMario[]>(this.sentMarioAllUrl).subscribe((data) => {
      this.sentMarioData = data;
      this.sentMarios$.next(data);
    });
  }

  addSentMarios(payload: SentMarioPayload ) {
    return this.http.post<SentMario>(this.sentMarioUrl, payload).subscribe((data) => {
      this.sentMarioData.push(data);
      this.sentMarios$.next([...this.sentMarioData]);
    });
  }
}
