import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatInputComponent {
  newMessage: string = '';
  messages: string[] = [];

  @Output() clickSend = new EventEmitter<void>();

  sendMessage() {
    if (this.newMessage.trim()) {
      this.clickSend.emit()
      this.newMessage = '';
    }
  }
}
