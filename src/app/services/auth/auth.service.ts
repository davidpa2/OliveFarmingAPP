import { inject, Injectable } from '@angular/core';
import { CoreProvider } from '../core';
import { environment } from 'src/environments/environment';
import { UserLoginDto } from '../api/models';
import { login$Json } from '../api/fn/users/login-json';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from '../api/api-configuration';
import { me$Json } from '../api/functions';

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

  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);

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
    let sess = null;

    try {
      const savedSession = localStorage.getItem('appSession');
      if (savedSession) {
        sess = JSON.parse(savedSession);
      }
    } catch (e) {
      localStorage.removeItem('appSession');
    }

    if (sess && sess.token) {
      this.data = sess;
      environment.authToken = this.data.token;
    }

    if (this.token) {
      me$Json(this.http, this.apiConfig.rootUrl).subscribe({
        next: response => {
          if (!this.initedData) {
            this.initedData = true;
          }
          this.data.user = response.body; 
          this.updateStorage();
        },
        error: err => {
          if (!this.initedData) {
            this.initedData = true;
          }
          this.data = { user: null, token: null };
          environment.authToken = '';
          this.updateStorage();

          this.core.errorToast(
            undefined, 'Su sesión anterior ha sido cerrada por seguridad', 15000
          );
        }
      })
    } else {
      if (!this.initedData) {
        this.initedData = true;
      }
    }
  }

  public login(
    data: UserLoginDto,
    cbSuccess: Function,
    cbErr: Function
  ) {
    const handleErr = (err: any) => {
      if (cbErr) {
        cbErr(err);
      } else {
        this.core.errorToast();
        console.error('Error in login request', err);
      }
    };

    login$Json(this.http, this.apiConfig.rootUrl, { body: data }).subscribe({
      next: (response) => {
        if (response.body.jwt) {
          environment.authToken = response.body.jwt;
          this.data.token = response.body.jwt;

          me$Json(this.http, this.apiConfig.rootUrl).subscribe({
            next: userResponse => {
              this.data.user = userResponse.body;
              this.updateStorage();

              if (cbSuccess) {
                cbSuccess();
              }
            },
            error: err => {
              handleErr(err);
            }
          })
        }
      },
      error: (err) => {
        handleErr(err);
      }
    })
  }

  public logout(cb: Function) {
    this.data = { user: null, token: null };
    environment.authToken = '';
    this.updateStorage();
    cb();
  }

  updateStorage() {
    localStorage.setItem('appSession', JSON.stringify(this.data));
  }
}
