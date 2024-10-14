import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { ChannelModel } from 'app/model/ChannelModel';
import { UserChannel } from 'app/model/UserChannel';
import { BASE_URL } from 'app/consts/common';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private apiUrl = BASE_URL;

  constructor(private http: HttpClient) { }

  getChannels(): Observable<ChannelModel[]> {
    return this.http.get<ChannelModel[]>(`${this.apiUrl}/channels`);
  }

  getUserChannels(userId: string): Observable<ChannelModel[]> {
    return this.http.get<UserChannel[]>(`${this.apiUrl}/userChannels?userId=${userId}`).pipe(
      switchMap(userChannels => {
        const channelIds = userChannels.map(chat => chat.channelId);
        return this.http.get<ChannelModel[]>(`${this.apiUrl}/channels`).pipe(
          map(channels => channels.filter(channel => channelIds.includes(channel.id)))
        );
      })
    );
  }
}