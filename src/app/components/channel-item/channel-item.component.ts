import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-channel-item',
  templateUrl: './channel-item.component.html',
  styleUrl: './channel-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelItemComponent {
  @Input() title: string = '';
  @Input() isActive: boolean = true;
}
