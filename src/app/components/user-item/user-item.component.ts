import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserItemComponent {
  @Input() username: string = 'Idel';
  @Input() isOnline: boolean = true;
}
