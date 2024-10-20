import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatInputComponent {
  newMessage: string = '';
  messages: string[] = [];

  @Input() isDisabled: boolean = false;

  @Output() clickSend = new EventEmitter<string>();

  sendMessage() {
    if (this.newMessage.trim()) {
      this.clickSend.emit(this.newMessage)
      this.newMessage = '';
    }
  }
}
