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

import { RainLog } from '../models/rain-log';
import { RainLogCreateDto } from '../models/rain-log-create-dto';
import { SeasonLitersDto } from '../models/season-liters-dto';

@Injectable({
  providedIn: 'root',
})
export class RainService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiRainSeasonSeasonNameGet
   */
  static readonly ApiRainSeasonSeasonNameGetPath = '/api/Rain/season/{seasonName}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiRainSeasonSeasonNameGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiRainSeasonSeasonNameGet$Plain$Response(params: {
    seasonName: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<RainLog>>> {

    const rb = new RequestBuilder(this.rootUrl, RainService.ApiRainSeasonSeasonNameGetPath, 'get');
    if (params) {
      rb.path('seasonName', params.seasonName, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<RainLog>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiRainSeasonSeasonNameGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiRainSeasonSeasonNameGet$Plain(params: {
    seasonName: string;
  },
  context?: HttpContext

): Observable<Array<RainLog>> {

    return this.apiRainSeasonSeasonNameGet$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<RainLog>>) => r.body as Array<RainLog>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiRainSeasonSeasonNameGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiRainSeasonSeasonNameGet$Json$Response(params: {
    seasonName: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<RainLog>>> {

    const rb = new RequestBuilder(this.rootUrl, RainService.ApiRainSeasonSeasonNameGetPath, 'get');
    if (params) {
      rb.path('seasonName', params.seasonName, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<RainLog>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiRainSeasonSeasonNameGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiRainSeasonSeasonNameGet$Json(params: {
    seasonName: string;
  },
  context?: HttpContext

): Observable<Array<RainLog>> {

    return this.apiRainSeasonSeasonNameGet$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<RainLog>>) => r.body as Array<RainLog>)
    );
  }

  /**
   * Path part for operation apiRainPost
   */
  static readonly ApiRainPostPath = '/api/Rain';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiRainPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiRainPost$Plain$Response(params?: {
    body?: RainLogCreateDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, RainService.ApiRainPostPath, 'post');
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
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiRainPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiRainPost$Plain(params?: {
    body?: RainLogCreateDto
  },
  context?: HttpContext

): Observable<string> {

    return this.apiRainPost$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiRainPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiRainPost$Json$Response(params?: {
    body?: RainLogCreateDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, RainService.ApiRainPostPath, 'post');
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
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiRainPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiRainPost$Json(params?: {
    body?: RainLogCreateDto
  },
  context?: HttpContext

): Observable<string> {

    return this.apiRainPost$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation apiRainIdDelete
   */
  static readonly ApiRainIdDeletePath = '/api/Rain/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiRainIdDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiRainIdDelete$Plain$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, RainService.ApiRainIdDeletePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiRainIdDelete$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiRainIdDelete$Plain(params: {
    id: number;
  },
  context?: HttpContext

): Observable<string> {

    return this.apiRainIdDelete$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiRainIdDelete$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiRainIdDelete$Json$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, RainService.ApiRainIdDeletePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiRainIdDelete$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiRainIdDelete$Json(params: {
    id: number;
  },
  context?: HttpContext

): Observable<string> {

    return this.apiRainIdDelete$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation apiRainSeasonSeasonNameLitersGet
   */
  static readonly ApiRainSeasonSeasonNameLitersGetPath = '/api/Rain/season/{seasonName}/liters';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiRainSeasonSeasonNameLitersGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiRainSeasonSeasonNameLitersGet$Plain$Response(params: {
    seasonName: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<SeasonLitersDto>> {

    const rb = new RequestBuilder(this.rootUrl, RainService.ApiRainSeasonSeasonNameLitersGetPath, 'get');
    if (params) {
      rb.path('seasonName', params.seasonName, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SeasonLitersDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiRainSeasonSeasonNameLitersGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiRainSeasonSeasonNameLitersGet$Plain(params: {
    seasonName: string;
  },
  context?: HttpContext

): Observable<SeasonLitersDto> {

    return this.apiRainSeasonSeasonNameLitersGet$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<SeasonLitersDto>) => r.body as SeasonLitersDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiRainSeasonSeasonNameLitersGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiRainSeasonSeasonNameLitersGet$Json$Response(params: {
    seasonName: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<SeasonLitersDto>> {

    const rb = new RequestBuilder(this.rootUrl, RainService.ApiRainSeasonSeasonNameLitersGetPath, 'get');
    if (params) {
      rb.path('seasonName', params.seasonName, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SeasonLitersDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiRainSeasonSeasonNameLitersGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiRainSeasonSeasonNameLitersGet$Json(params: {
    seasonName: string;
  },
  context?: HttpContext

): Observable<SeasonLitersDto> {

    return this.apiRainSeasonSeasonNameLitersGet$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<SeasonLitersDto>) => r.body as SeasonLitersDto)
    );
  }

}
