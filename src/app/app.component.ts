import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { Observable } from 'rxjs';
import { UserModel } from './model/UserModel';
import { Store } from '@ngrx/store';
import { selectAllUsers, selectIsUserLoading, selectUserError, selectUserLoading } from './store/chat.selectors';
import { authMe, loadUsers } from './store/chat.actions';
import { LOCAL_STORAGE_USER_ID } from './consts/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  title = 'reglab';
  loading$: Observable<boolean>;
  constructor(private store: Store) {
    this.loading$ = this.store.select(selectIsUserLoading);
  }

  ngOnInit() {
    if (localStorage.getItem(LOCAL_STORAGE_USER_ID)) {
      this.store.dispatch(authMe());
    }
  }
}
