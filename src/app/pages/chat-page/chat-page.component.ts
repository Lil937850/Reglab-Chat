import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserModel } from 'app/model/UserModel';
import { selectUserInfo } from 'app/store/chat.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatPageComponent {
  user$: Observable<UserModel | null>

  constructor(private store: Store) {
    this.user$ = this.store.select(selectUserInfo);
  }
}
