import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageModel } from 'app/model/MessageModel';
import { BASE_URL } from 'app/consts/common';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = BASE_URL;

  constructor(private http: HttpClient) { }

  getChannelMessages(id: string): Observable<MessageModel[]> {
    return this.http.get<MessageModel[]>(`${this.apiUrl}/messages?channelId=${id}`);
  }
}