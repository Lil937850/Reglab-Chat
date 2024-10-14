import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChannelModel } from 'app/model/ChannelModel';
import { loadChannelsByUserId, setActiveChannelId } from 'app/store/chat.actions';
import { selectActiveChannel, selectMyChannels, selectMyChannelsError, selectMyChannelsIsLoading } from 'app/store/chat.selectors';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrl: './channel-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelListComponent implements OnInit {
  channels$: Observable<ChannelModel[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  isActiveId: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(private store: Store) {
    this.channels$ = this.store.select(selectMyChannels);
    this.loading$ = this.store.select(selectMyChannelsIsLoading);
    this.error$ = this.store.select(selectMyChannelsError);

    this.store.select(selectActiveChannel).pipe(takeUntil(this.destroy$)).subscribe((isActiveId) => {
      this.isActiveId = isActiveId
    });
  }

  ngOnInit() {
    this.store.dispatch(loadChannelsByUserId());
  }

  loadChannelUsers(channelId: string) {
    this.store.dispatch(setActiveChannelId({ channelId }))
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
