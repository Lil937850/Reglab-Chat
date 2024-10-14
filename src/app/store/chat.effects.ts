import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
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
  loginSuccess
} from './chat.actions';
import { UserService } from 'app/services/user.service';
import { ChannelService } from 'app/services/channel.service';
import { MessageService } from 'app/services/message.service';
import { AuthService } from 'app/services/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppRoutes } from 'app/consts/routes';
import { Store } from '@ngrx/store';
import { selectMyId } from './chat.selectors';

@Injectable()
export class ChatEffects {
  constructor(
    private userService: UserService,
    private channelService: ChannelService,
    private messageService: MessageService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store
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
