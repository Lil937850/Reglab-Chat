import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { UserActionsComponent } from './components/user-actions/user-actions.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChannelItemComponent } from './components/channel-item/channel-item.component';
import { ChannelListComponent } from './containers/channel-list/channel-list.component';
import { ChannelsComponent } from './containers/channels/channels.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { UserListComponent } from './containers/user-list/user-list.component';
import { UsersComponent } from './containers/users/users.component';
import { ChatWindowComponent } from './containers/chat-window/chat-window.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { ChatComponent } from './containers/chat/chat.component';
import { ChatMessagesComponent } from './containers/chat-messages/chat-messages.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { chatReducer } from './store/chat.reducer';
import { ChatEffects } from './store/chat.effects';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // используем новую функцию
import { UserService } from './services/user.service';
import { LoginComponent } from './pages/login/login.component';
import { MatSpinner } from '@angular/material/progress-spinner';
import { AuthService } from './services/auth';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { MatListModule } from '@angular/material/list'; // Импортируйте MatListModule
import { MatDividerModule } from '@angular/material/divider';
import { MessageItemComponent } from './components/message-item/message-item.component';
@NgModule({
  declarations: [
    AppComponent,
    UserActionsComponent,
    UserActionsComponent,
    ChannelItemComponent,
    ChannelListComponent,
    ChannelsComponent,
    UserItemComponent,
    UserListComponent,
    UsersComponent,
    ChatWindowComponent,
    ChatInputComponent,
    ChatComponent,
    ChatMessagesComponent,
    LoginComponent,
    ChatPageComponent,
    MessageItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    FlexLayoutModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    StoreModule.forRoot({ user: chatReducer }), 
    EffectsModule.forRoot([ChatEffects]),
    HttpClientModule, 
    BrowserModule,
    ReactiveFormsModule,
    MatSpinner,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatListModule
  ],
  providers: [
    UserService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
