import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrl: './user-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserActionsComponent {
  @Input() name: string | undefined = ''
  @Output() clickSetting = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  onSettingsClick() {
    this.clickSetting.emit();  
  }
  onLogoutClick() {
    this.logout.emit(); 
  }
}
