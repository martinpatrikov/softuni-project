import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { IJWT } from 'src/app/shared/interfaces/jwt';
import { IUser } from '../../shared/interfaces/user';


@Injectable()
export class UserService {

  jwt: IJWT | null | undefined = undefined;

  get isLogged(): boolean {
    return !!this.getJwtToken();
  }

  constructor(
    private http: HttpClient
  ) { }

  login(data: { email: string; password: string }) {
    return this.http.post<IJWT>(`/api/users/login`, data).pipe(
      tap(jwt => this.setJwtToken(jwt))
    );
  }

  register(data: { email: string; password: string }) {
    return this.http.post<IJWT>(`/api/users/register`, data).pipe(
      tap(jwt => this.setJwtToken(jwt))
    );
  }

  logout() {
    return this.http.get<IJWT>(`/api/users/logout`, {}).pipe(
      tap(() => this.setJwtToken({ accessToken: '', email: '', _id: '' }))
    );
  }

  getJwtToken() {
    return sessionStorage.getItem('jwt');
  }

  setJwtToken(token: IJWT) {
    sessionStorage.setItem('jwt', token.accessToken);
    sessionStorage.setItem('email', JSON.stringify(token.email));
    sessionStorage.setItem('_id', JSON.stringify(token._id));
  }

  
  addToPlaylist(_id: string){
    return this.http.post<any>(`/api/users/playlist`, {_id});
  }
  inPlaylist(_id: string){
    return this.http.post<any>(`/api/users/inPlaylist`, {_id});
  }
}