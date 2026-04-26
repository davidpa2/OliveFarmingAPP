/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { LoginDto } from '../models/login-dto';
import { UserLoginDto } from '../models/user-login-dto';
import { UserMeDto } from '../models/user-me-dto';
import { UserRegisterDto } from '../models/user-register-dto';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation register
   */
  static readonly RegisterPath = '/api/Users/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  register$Response(params?: {
    body?: UserRegisterDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.RegisterPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  register(params?: {
    body?: UserRegisterDto
  },
  context?: HttpContext

): Observable<void> {

    return this.register$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation login
   */
  static readonly LoginPath = '/api/Users/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  login$Plain$Response(params?: {
    body?: UserLoginDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<LoginDto>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.LoginPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoginDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `login$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  login$Plain(params?: {
    body?: UserLoginDto
  },
  context?: HttpContext

): Observable<LoginDto> {

    return this.login$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<LoginDto>) => r.body as LoginDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  login$Json$Response(params?: {
    body?: UserLoginDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<LoginDto>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.LoginPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoginDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `login$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  login$Json(params?: {
    body?: UserLoginDto
  },
  context?: HttpContext

): Observable<LoginDto> {

    return this.login$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<LoginDto>) => r.body as LoginDto)
    );
  }

  /**
   * Path part for operation me
   */
  static readonly MePath = '/api/Users/me';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `me$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  me$Plain$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<UserMeDto>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.MePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserMeDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `me$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  me$Plain(params?: {
  },
  context?: HttpContext

): Observable<UserMeDto> {

    return this.me$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<UserMeDto>) => r.body as UserMeDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `me$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  me$Json$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<UserMeDto>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.MePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserMeDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `me$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  me$Json(params?: {
  },
  context?: HttpContext

): Observable<UserMeDto> {

    return this.me$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<UserMeDto>) => r.body as UserMeDto)
    );
  }

}
