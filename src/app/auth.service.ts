import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { User } from './model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: BehaviorSubject<User> = new BehaviorSubject(new User(null, null, false, []));

  constructor(private http: HttpClient) {
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>('https://wowraid-api.herokuapp.com/user/authenticated', {withCredentials: true});
  }

  getUser(): Observable<User> {
    this.http.get<User>('https://wowraid-api.herokuapp.com/user', {withCredentials: true}).subscribe(user => this.user.next(user));
    return this.user.asObservable();
  }

}
