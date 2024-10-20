import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  authMe,
  authMeFailure,
  authMeSuccess,
  loadChannelsByUserId,
  loadChannelsByUserIdFailure,
  loadChannelsByUserIdSuccess,
  loadMessagesByChannelId,
  loadMessagesByChannelIdFailure,
  loadMessagesByChannelIdSuccess,
  loadUsers,
  loadUsersByChannelId,
  loadUsersByChannelIdFailure,
  loadUsersByChannelIdSuccess,
  loadUsersFailure,
  loadUsersSuccess,
  login,
  loginFailure,
  loginSuccess,
  logout,
  sendMessageToChannel,
  sendMessageToChannelFailure,
  sendMessageToChannelSuccess,
  updateStatus,
  updateStatusSuccess
} from './chat.actions';
import { UserService } from 'app/services/user.service';
import { ChannelService } from 'app/services/channel.service';
import { MessageService } from 'app/services/message.service';
import { AuthService } from 'app/services/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/consts/routes';
import { Store } from '@ngrx/store';
import { selectActiveChannel, selectMyId, selectUserInfo } from './chat.selectors';
import { generateId } from 'app/utils/generateId';
import { LOCAL_STORAGE_USER_ID } from 'app/consts/common';

@Injectable()
export class ChatEffects {
  
  constructor(
    private userService: UserService,
    private channelService: ChannelService,
    private messageService: MessageService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store,
  ) { }

  loadUsers$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map(users => loadUsersSuccess({ users })),
          catchError(error => {
            this.snackBar.open('Ошибка при загрузке списка пользователей: ' + error.error, 'Закрыть', {
              duration: 5000,
            });
            return of(loadUsersFailure({ error: error.message }))
          })
        )
      )
    )
  });

  authMe$ = createEffect(() => {
    const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID)
    return inject(Actions).pipe(
      ofType(authMe),
      switchMap(() =>
        this.authService.authMe(userId).pipe(
          map(users => {
              return authMeSuccess({user: users.length ? users[0] : null})
          }),
          catchError(error => {
            this.snackBar.open('При попытке получить данные пользователя произошла ошибка: ' + error.error, 'Закрыть', {
              duration: 5000,
            });
            return of(authMeFailure({ error: error.message }))
          })
        )
      )
    )
  });

  updateStatus$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(loginSuccess, logout),
      switchMap((action) => {
        const {user} = action
        const isLogin = action.type === '[Chat] Login Success'
        if (!isLogin) {
          localStorage.removeItem(LOCAL_STORAGE_USER_ID)
          this.router.navigate([AppRoutes.LOGIN]);
        }
          return this.userService.updateUserStatus(user.id, isLogin).pipe(
            map((userInfo) => {
                return updateStatusSuccess(userInfo)
            }),
            catchError(error => {
              this.snackBar.open('При попытке получить данные пользователя произошла ошибка: ' + error.error, 'Закрыть', {
                duration: 5000,
              });
              return of(authMeFailure({ error: error.message }))
            })
          )
      }
      ))
  });

  loadUsersByChannelId$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(loadUsersByChannelId),
      switchMap(({ channelId }) =>
        this.userService.getChannelUsers(channelId).pipe(
          map(users => {
            return loadUsersByChannelIdSuccess({ users, channelId: channelId })
          }),
          catchError(error => {
            this.snackBar.open('Ошибка при загрузке списка пользователей канала' + error.error, 'Закрыть', {
              duration: 5000,
            });
            return of(loadUsersByChannelIdFailure({ error: error.message, channelId: channelId }))
          })
        )
      )
    )
  });

  loadChannelsByUserId$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(loadChannelsByUserId),
      switchMap(() =>
        this.store.select(selectMyId).pipe(switchMap((userId) => {
          if (!userId) {
            return of(loadChannelsByUserIdFailure({ error: 'User ID is missing' }));
          }
          return this.channelService.getUserChannels(userId).pipe(
            map(channels => {
              return loadChannelsByUserIdSuccess({ channels })
            }),
            catchError(error => {
              this.snackBar.open('Ошибка при загрузке списка каналов: ' + error.error, 'Закрыть', {
                duration: 5000,
              });
              return of(loadChannelsByUserIdFailure({ error: error.message }))
            })
          )
        }
        )))
    )
  });

  loadMessagesByChannelId$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(loadMessagesByChannelId),
      switchMap(({ channelId }) =>
        this.messageService.getChannelMessages(channelId).pipe(
          map(messages => loadMessagesByChannelIdSuccess({ messages, channelId })),
          catchError(error => {
            this.snackBar.open('Ошибка при загрузке сообщений: ' + error.error, 'Закрыть', {
              duration: 5000,
            });
            return of(loadMessagesByChannelIdFailure({ error: error.message, channelId }))
          })
        )
      )
    )
  });


  sendMessageToChannel$ = createEffect(() => {
    const store = inject(Store);
    return inject(Actions).pipe(
      ofType(sendMessageToChannel),
      withLatestFrom(
          store.select(selectActiveChannel),
          store.select(selectUserInfo)  
        ),
      mergeMap(([action, activeChannelId, user]) => {
        const username = user?.username || ''
        const id = user?.id || ''
        const messageId = generateId()
        if (!activeChannelId) {
          return of(sendMessageToChannelFailure({ error: 'Channel ID is not selected', channelId: activeChannelId || '', messageId: messageId }));
        }
        const messageData = {
          id: messageId,
          content: action.content,
          fromUser: id,
          username: username,
          channelId: activeChannelId
        }
        return this.messageService.sendMessageToChannel(messageData).pipe(
          map(() => sendMessageToChannelSuccess(messageData)),
          catchError(error => {
            this.snackBar.open('Ошибка при отправке сообщения: ' + error.error, 'Закрыть', {
              duration: 5000,
            });
            return of(sendMessageToChannelFailure({ error: error.message, channelId: activeChannelId, messageId }))
          })
        )
      }
    ))
  });

  login$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(login),
      switchMap(action =>
        this.authService.login(action.username, action.password).pipe(
          map(response => {
            this.router.navigate([AppRoutes.MAIN]);
            if (!response.length) {
              this.snackBar.open('Ошибка при входе', 'Закрыть', {
                duration: 5000,
              });
              of(loginFailure({ error: 'Ошибка при входе' }))
            }
            const userData = response[0]
            return loginSuccess({ user: userData })
          }),
          catchError(error => {
            this.snackBar.open('Ошибка при входе: ' + error.error, 'Закрыть', {
              duration: 5000,
            });
            return of(loginFailure({ error: error.error }))
          })
        )
      )
    )
  );
}
