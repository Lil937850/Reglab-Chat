import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppRoutes } from 'app/consts/routes';
import { selectIsAuth } from 'app/store/chat.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private store: Store, private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.store.select(selectIsAuth).pipe(
            map((authState) => {
                console.log(authState);
                if (authState) {
                    return true;
                } else {
                    this.router.navigate([AppRoutes.LOGIN]);
                    return false;
                }
            })
        );
    }
}
