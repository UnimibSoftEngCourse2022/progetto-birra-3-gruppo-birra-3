import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public sessionUser: Observable<User>;
  private sessionUserSubject: BehaviorSubject<User | any>;

  constructor(
    private _http: HttpClient,
    private messageService: MessageService
  ) {
    this.sessionUserSubject = new BehaviorSubject<User>(
      JSON.parse(<any>localStorage.getItem('sessionUser'))
    );
    this.sessionUser = this.sessionUserSubject.asObservable();
  }

  public get sessionUserValue(): User {
    return this.sessionUserSubject.value;
  }

  signUp(email: string, firstname: string, surname: string, password: string) {
    return this._http
      .post<any>(`${environment.backendApi}auth/sign-up`, {
        email,
        password,
        firstname,
        surname,
      })
      .pipe(
        map((user) => {
          manageSignInSuccess(user, this.sessionUserSubject);
        })
      );
  }

  login(email: string, password: string) {
    return this._http
      .post<any>(`${environment.backendApi}auth/sign-in`, { email, password })
      .pipe(
        map((user) => {
          manageSignInSuccess(user, this.sessionUserSubject);
        })
      );
  }

  logout() {
    localStorage.removeItem('sessionUser');
    this.sessionUserSubject.next(null);
  }
}

const manageSignInSuccess = (
  user: any,
  sessionUserSubject: BehaviorSubject<User | any>
) => {
  if (user && user.token) {
    localStorage.setItem('sessionUser', JSON.stringify(user));
    sessionUserSubject.next(user);
  }

  return user;
};
