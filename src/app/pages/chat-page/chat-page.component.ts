import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserModel } from 'app/model/UserModel';
import { logout } from 'app/store/chat.actions';
import { selectUserInfo } from 'app/store/chat.selectors';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatPageComponent implements OnDestroy {
  user$: Observable<UserModel | null>;
  private unsubscribe$ = new Subject<void>(); 

  constructor(private store: Store) {
    this.user$ = this.store.select(selectUserInfo);
  }

  onLogout() {
    this.user$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((user) => {
      if (user) {
        this.store.dispatch(logout({user}))
      }
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
