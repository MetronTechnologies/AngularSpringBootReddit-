import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignupRequestPayload } from '../signup/signup_request_payload';
import { map, Observable } from 'rxjs';
import { LoginRequestPayload } from '../login/login_request_payload';
import { LoginResponse } from '../login/login_response_payload';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {

  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/auth/signup', signupRequestPayload,
      { responseType: 'text' }
    );
  }



  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.http.post<LoginResponse>('http://localhost:8080/api/auth/login',
      loginRequestPayload).pipe(
        map(
          data => {
            this.localStorage.store('authenticationToken', data.authenticationToken);
            this.localStorage.store('username', data.username);
            this.localStorage.store('refreshToken', data.refreshToken);
            this.localStorage.store('expiresAt', data.expiresAt);
            return true;
          }
        )
      );
  }






}
