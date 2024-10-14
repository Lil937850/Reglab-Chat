import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageModel } from 'app/model/MessageModel';
import { loadMessagesByChannelId } from 'app/store/chat.actions';
import { selectActiveChannel, selectMessagesByChannelId, selectMessagesByChannelIdError, selectMessagesByChannelIdLoading } from 'app/store/chat.selectors';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessagesComponent {
  messages$: Observable<MessageModel[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  private destroy$ = new Subject<void>();

  constructor(private store: Store) {
    this.messages$ = this.store.select(selectMessagesByChannelId());
    this.loading$ = this.store.select(selectMessagesByChannelIdLoading());
    this.error$ = this.store.select(selectMessagesByChannelIdError());

  }

  ngOnInit(): void {
    this.store.select(selectActiveChannel).pipe(takeUntil(this.destroy$)).subscribe((channelId) => {
      if (channelId) {
        this.loadChannelMessages(channelId)
      }
    });
  }

  loadChannelMessages(channelId: string) {
    this.store.dispatch(loadMessagesByChannelId({ channelId }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
