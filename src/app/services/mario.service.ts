import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mario } from '../interfaces/mario';

@Injectable({
  providedIn: 'root',
})
export class MarioService {
  private readonly marioUrl = '/api/marios';
  private readonly marioAddUrl = '/api/marios/add';
  private marioData: Mario[] = [];
  private marios$ = new BehaviorSubject<Mario[]>([]);

  constructor(private http: HttpClient) {}

  get marios(): Observable<Mario[]> {
    if (this.marioData.length === 0) {
      this.fetchMarios();
    }
    return this.marios$.asObservable();
  }

  fetchMarios() {
    return this.http.get<Mario[]>(this.marioUrl).subscribe((data) => {
      this.marioData = data;
      this.marios$.next(data);
    });
  }

  addMario(payload: { type: string }) {
    return this.http.post<Mario>(this.marioAddUrl, payload).subscribe((data) => {
      this.marioData.push(data);
      this.marios$.next([...this.marioData]);
    });
  }
}
