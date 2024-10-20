import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { MessageModel } from 'app/model/MessageModel';
import { BASE_URL } from 'app/consts/common';
import { UserService } from './user.service';
import { UserModel } from 'app/model/UserModel';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = BASE_URL;

  constructor(private http: HttpClient, private userService: UserService) {}

  getChannelMessages(id: string): Observable<MessageModel[]> {
    return this.http.get<MessageModel[]>(`${this.apiUrl}/messages?channelId=${id}`).pipe(
      switchMap((messages: MessageModel[]) => {
        const userRequests = messages.map(message => 
          this.userService.getUserById(message.fromUser).pipe(
            map((user: UserModel) => ({
              ...message,      
              username: user.username  
            }))
          )
        );
        return forkJoin(userRequests);
      }));
  }

  sendMessageToChannel(data: MessageModel): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/messages`, data);
  }
}