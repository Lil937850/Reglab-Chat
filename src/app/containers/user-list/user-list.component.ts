import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserModel } from 'app/model/UserModel';
import { loadUsersByChannelId } from 'app/store/chat.actions';
import { selectActiveChannel, selectUsersByChannelId, selectUsersByChannelIdError, selectUsersByChannelIdLoading } from 'app/store/chat.selectors';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  users$: Observable<UserModel[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  private destroy$ = new Subject<void>();

  constructor(private store: Store) {
    this.users$ = this.store.select(selectUsersByChannelId());
    this.loading$ = this.store.select(selectUsersByChannelIdLoading());
    this.error$ = this.store.select(selectUsersByChannelIdError());
  }

  ngOnInit(): void {
    this.store.select(selectActiveChannel).pipe(takeUntil(this.destroy$)).subscribe((channelId) => {
      if (channelId) {
        this.loadChannelUsers(channelId)
      }
    });
  }

  loadChannelUsers(channelId: string) {
    this.store.dispatch(loadUsersByChannelId({ channelId }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
