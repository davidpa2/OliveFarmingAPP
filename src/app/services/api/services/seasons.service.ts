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

import { SeasonCountDto } from '../models/season-count-dto';
import { SeasonsCreateDto } from '../models/seasons-create-dto';

@Injectable({
  providedIn: 'root',
})
export class SeasonsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiSeasonsGet
   */
  static readonly ApiSeasonsGetPath = '/api/Seasons';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSeasonsGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSeasonsGet$Plain$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<string>>> {

    const rb = new RequestBuilder(this.rootUrl, SeasonsService.ApiSeasonsGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<string>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiSeasonsGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSeasonsGet$Plain(params?: {
  },
  context?: HttpContext

): Observable<Array<string>> {

    return this.apiSeasonsGet$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSeasonsGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSeasonsGet$Json$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<string>>> {

    const rb = new RequestBuilder(this.rootUrl, SeasonsService.ApiSeasonsGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<string>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiSeasonsGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSeasonsGet$Json(params?: {
  },
  context?: HttpContext

): Observable<Array<string>> {

    return this.apiSeasonsGet$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }

  /**
   * Path part for operation apiSeasonsPost
   */
  static readonly ApiSeasonsPostPath = '/api/Seasons';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSeasonsPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiSeasonsPost$Response(params?: {
    body?: SeasonsCreateDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SeasonsService.ApiSeasonsPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiSeasonsPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiSeasonsPost(params?: {
    body?: SeasonsCreateDto
  },
  context?: HttpContext

): Observable<void> {

    return this.apiSeasonsPost$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiSeasonsCountGet
   */
  static readonly ApiSeasonsCountGetPath = '/api/Seasons/count';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSeasonsCountGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSeasonsCountGet$Plain$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<SeasonCountDto>> {

    const rb = new RequestBuilder(this.rootUrl, SeasonsService.ApiSeasonsCountGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SeasonCountDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiSeasonsCountGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSeasonsCountGet$Plain(params?: {
  },
  context?: HttpContext

): Observable<SeasonCountDto> {

    return this.apiSeasonsCountGet$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<SeasonCountDto>) => r.body as SeasonCountDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSeasonsCountGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSeasonsCountGet$Json$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<SeasonCountDto>> {

    const rb = new RequestBuilder(this.rootUrl, SeasonsService.ApiSeasonsCountGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SeasonCountDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiSeasonsCountGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSeasonsCountGet$Json(params?: {
  },
  context?: HttpContext

): Observable<SeasonCountDto> {

    return this.apiSeasonsCountGet$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<SeasonCountDto>) => r.body as SeasonCountDto)
    );
  }

}
