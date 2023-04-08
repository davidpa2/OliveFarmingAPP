import { Injectable } from '@angular/core';
import { CoreProvider } from '../core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private data: {
    user: any;
    token: any;
    // user: AuthMeResp;
    // token: TokenRes;
  } = { user: null, token: null };
  private initedData = false;
  private core!: CoreProvider;

  constructor() { }

  public get inited(): boolean {
    return this.initedData;
  }
  public get user() {
    return this.data.user;
  }
  public get token() {
    return environment.authToken ? 'Bearer ' + environment.authToken : '';
  }
  
  public init = (core: CoreProvider) => {
    this.core = core;
    this.initChecks();
  };

  private initChecks() {
    //TODO: Add token refresh every hour since last refresh/login
    const sess = JSON.parse(localStorage.getItem('session')!);
    if (sess && sess.token) {
      this.data = sess;
      environment.authToken = this.data.token.access_token;
    }

    if (this.token) {
    //   this.core.api.auth.authMe().subscribe(
    //     (user) => {
    //       if (!this.initedData) {
    //         this.initedData = true;
    //       }
    //       this.data.user = user;

    //       this.updateStorage();
    //     },
    //     () => {
    //       if (!this.initedData) {
    //         this.initedData = true;
    //       }
    //       this.data = { user: null, token: null };
    //       environment.authToken = '';
    //       this.updateStorage();
    //       // this.core.errorToast(
    //       //   null,
    //       //   'Su sesión anterior ha sido cerrada por seguridad',
    //       //   15000
    //       // );
    //     }
    //   );
    } else {
      if (!this.initedData) {
        this.initedData = true;
      }
    }
  }

  public logout(cb: Function) {
    // this.core.api.auth.authLogout().subscribe(
    //   () => {
    //     this.data = { user: null, token: null };
    //     environment.authToken = '';
    //     this.updateStorage();
    //     if (cb) {
    //       cb();
    //     }
    //   },
    //   (err) => {
    //     if (err.status === 401) {
    //       // Handle already invalid session
    //       this.data = { user: null, token: null };
    //       environment.authToken = '';
    //       this.updateStorage();
    //       if (cb) {
    //         cb();
    //       }
    //     } else {
    //       this.core.errorToast(null, err);
    //     }
    //   }
    // );
  }

  updateStorage() {
    localStorage.setItem('session', JSON.stringify(this.data));
  }
}
