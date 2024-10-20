import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { sendMessageToChannel } from 'app/store/chat.actions';
import { selectActiveChannel } from 'app/store/chat.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent {
  selectedChannel$: Observable<string | null>;
  constructor(private store: Store) {
    this.selectedChannel$ = this.store.select(selectActiveChannel);
  }

  receiveMessage(event: string) {
    this.store.dispatch(sendMessageToChannel({ content: event }));
  }
}
