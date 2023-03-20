import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwt = new JwtHelperService();

class DecodedToken {
  userID: string = '';
  username: string = '';
  exp: number = 0;
}

@Injectable()
export class AuthService {
  private decodedToken: any;

  constructor(private http: HttpClient) {
    this.decodedToken = JSON.parse(localStorage.getItem('app-meta') || '{}');
  }

  // getProducts(): Observable<any> {
  //   return this.http.get('/api/v1/products');
  // }

  register(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/register', userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/login', userData).pipe(
      map((token) => {
        this.decodedToken = jwt.decodeToken(JSON.stringify(token));
        localStorage.setItem('app-auth', JSON.stringify(token));
        localStorage.setItem('app-meta', JSON.stringify(this.decodedToken));

        return token;
      })
    );
  }
}
