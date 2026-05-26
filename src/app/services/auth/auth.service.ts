import { inject, Injectable } from '@angular/core';
import { CoreProvider } from '../core';
import { environment } from 'src/environments/environment';
import { UserLoginDto, LoginDto } from '../api/models';
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
    const sess = JSON.parse(localStorage.getItem('appSession')!);
    
    if (sess && sess.token) {
      this.data = sess;
      environment.authToken = this.data.token;
    }

    if (this.token) {
      me$Json(this.http, this.apiConfig.rootUrl).subscribe({
        next: user => {
          if (!this.initedData) {
            this.initedData = true;
          }
          this.data.user = user;
          this.updateStorage();
        },
        error: err => {
          if (!this.initedData) {
            this.initedData = true;
          }
          this.data = { user: null, token: null };
          environment.authToken = '';
          this.updateStorage();
          // this.core.errorToast(
          //   undefined, 'Su sesión anterior ha sido cerrada por seguridad', 15000
          // );
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
              next: user => {
                this.data.user = user;
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
    localStorage.setItem('appSession', JSON.stringify(this.data));
  }
}
