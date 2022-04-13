import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { IJWT } from 'src/app/shared/interfaces/jwt';
import { IUser } from '../../shared/interfaces/user';


@Injectable()
export class UserService {

  jwt: IJWT | null | undefined = undefined;

  get isLogged(): boolean {
    return !!this.jwt;
  }

  constructor(
    private http: HttpClient
  ) { }

  login(data: { email: string; password: string }) {
    return this.http.post<IJWT>(`/api/users/login`, data).pipe(
      tap((jwt) => this.jwt = jwt)
    );
  }

  register(data: { email: string; password: string }) {
    return this.http.post<IJWT>(`/api/users/register`, data).pipe(
      tap((jwt) => { this.jwt = jwt; console.log(jwt) })
    );
  }

  logout() {
    return this.http.post<IJWT>(`/api/users/logout`, {}).pipe(
      tap(() => this.jwt = null)
    );
  }
}