import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { UserModel } from 'app/model/UserModel';
import { UserChannel } from 'app/model/UserChannel';
import { BASE_URL } from 'app/consts/common';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = BASE_URL;

    constructor(private http: HttpClient) { }

    getUsers(): Observable<UserModel[]> {
        return this.http.get<UserModel[]>(`${this.apiUrl}/users`);
    }

    getChannelUsers(channelId: string): Observable<UserModel[]> {
        return this.http.get<UserChannel[]>(`${this.apiUrl}/userChannels?channelId=${channelId}`).pipe(
            switchMap(userChannels => {
                const userIds = userChannels.map(chat => chat.userId);
                return this.http.get<UserModel[]>(`${this.apiUrl}/users`).pipe(
                    map(users => users.filter(user => userIds.includes(user.id)))
                );
            })
        );
    }
}