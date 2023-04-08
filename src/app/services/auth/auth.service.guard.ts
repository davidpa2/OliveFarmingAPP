import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CoreProvider } from '../core';

@Injectable({
    providedIn: 'root'
})
export class AuthServiceGuard implements CanActivate {

    constructor(private core: CoreProvider, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        _state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let res = this.core.isLoggedIn;
        if (next.data) res = res && this.core.isShowed(next.data);

        if (!res && !this.core.isLoggedIn) this.router.navigateByUrl('/login');
        if (!res && this.core.isLoggedIn) {
            this.router.navigateByUrl('/');
            this.core.errorToast(undefined, 'No tiene permiso');
        }
        return res;
    }

}
