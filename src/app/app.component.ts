import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { Observable } from 'rxjs';
import { UserModel } from './model/UserModel';
import { Store } from '@ngrx/store';
import { selectAllUsers, selectUserError, selectUserLoading } from './store/chat.selectors';
import { loadUsers } from './store/chat.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'reglab';
}
