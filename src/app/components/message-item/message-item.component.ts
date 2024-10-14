import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageItemComponent {
  @Input() name: string = '';
  @Input() message: string = '';
}
