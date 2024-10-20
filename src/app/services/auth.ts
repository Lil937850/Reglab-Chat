import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserModel } from 'app/model/UserModel';
import { BASE_URL, LOCAL_STORAGE_USER_ID } from 'app/consts/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = BASE_URL;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/users?username=${username}&password=${password}`).pipe(
      tap(response => {
        if (response.length) {
          localStorage.setItem(LOCAL_STORAGE_USER_ID, response[0]?.id);
        }
      })
    );
  }

  authMe(userId: string | null): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/users?userId=${userId}`);
  }
}