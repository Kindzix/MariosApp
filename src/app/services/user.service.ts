import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {User, UserPayload} from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userUrl = '/api/users';
  private readonly userAddUrl = '/api/users/add';
  private userData: User[] = [];
  private users$ = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) {}

  get users(): Observable<User[]> {
    if (this.userData.length === 0) {
      this.fetchUsers();
    }
    return this.users$.asObservable();
  }

  fetchUsers() {
    return this.http.get<User[]>(this.userUrl).subscribe((data) => {
      this.userData = data;
      this.users$.next(data);
    });
  }

  addUser(payload: UserPayload) {
    return this.http.post<User>(this.userAddUrl, payload).subscribe((data) => {
      this.userData.push(data);
      this.users$.next([...this.userData]);
    });
  }
}
