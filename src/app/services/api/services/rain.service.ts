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
   * Path part for operation findBySeason
   */
  static readonly FindBySeasonPath = '/api/Rain/season/{seasonName}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findBySeason$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  findBySeason$Plain$Response(params: {
    seasonName: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<RainLog>>> {

    const rb = new RequestBuilder(this.rootUrl, RainService.FindBySeasonPath, 'get');
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
   * To access the full response (for headers, for example), `findBySeason$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findBySeason$Plain(params: {
    seasonName: string;
  },
  context?: HttpContext

): Observable<Array<RainLog>> {

    return this.findBySeason$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<RainLog>>) => r.body as Array<RainLog>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findBySeason$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  findBySeason$Json$Response(params: {
    seasonName: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<RainLog>>> {

    const rb = new RequestBuilder(this.rootUrl, RainService.FindBySeasonPath, 'get');
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
   * To access the full response (for headers, for example), `findBySeason$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findBySeason$Json(params: {
    seasonName: string;
  },
  context?: HttpContext

): Observable<Array<RainLog>> {

    return this.findBySeason$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<RainLog>>) => r.body as Array<RainLog>)
    );
  }

  /**
   * Path part for operation newRainLog
   */
  static readonly NewRainLogPath = '/api/Rain';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `newRainLog$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  newRainLog$Plain$Response(params?: {
    body?: RainLogCreateDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, RainService.NewRainLogPath, 'post');
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
   * To access the full response (for headers, for example), `newRainLog$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  newRainLog$Plain(params?: {
    body?: RainLogCreateDto
  },
  context?: HttpContext

): Observable<string> {

    return this.newRainLog$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `newRainLog$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  newRainLog$Json$Response(params?: {
    body?: RainLogCreateDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, RainService.NewRainLogPath, 'post');
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
   * To access the full response (for headers, for example), `newRainLog$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  newRainLog$Json(params?: {
    body?: RainLogCreateDto
  },
  context?: HttpContext

): Observable<string> {

    return this.newRainLog$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation deleteRainLog
   */
  static readonly DeleteRainLogPath = '/api/Rain/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRainLog$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRainLog$Plain$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, RainService.DeleteRainLogPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteRainLog$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRainLog$Plain(params: {
    id: number;
  },
  context?: HttpContext

): Observable<string> {

    return this.deleteRainLog$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRainLog$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRainLog$Json$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, RainService.DeleteRainLogPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteRainLog$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRainLog$Json(params: {
    id: number;
  },
  context?: HttpContext

): Observable<string> {

    return this.deleteRainLog$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation seasonLiters
   */
  static readonly SeasonLitersPath = '/api/Rain/season/{seasonName}/liters';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `seasonLiters$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  seasonLiters$Plain$Response(params: {
    seasonName: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<SeasonLitersDto>> {

    const rb = new RequestBuilder(this.rootUrl, RainService.SeasonLitersPath, 'get');
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
   * To access the full response (for headers, for example), `seasonLiters$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  seasonLiters$Plain(params: {
    seasonName: string;
  },
  context?: HttpContext

): Observable<SeasonLitersDto> {

    return this.seasonLiters$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<SeasonLitersDto>) => r.body as SeasonLitersDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `seasonLiters$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  seasonLiters$Json$Response(params: {
    seasonName: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<SeasonLitersDto>> {

    const rb = new RequestBuilder(this.rootUrl, RainService.SeasonLitersPath, 'get');
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
   * To access the full response (for headers, for example), `seasonLiters$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  seasonLiters$Json(params: {
    seasonName: string;
  },
  context?: HttpContext

): Observable<SeasonLitersDto> {

    return this.seasonLiters$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<SeasonLitersDto>) => r.body as SeasonLitersDto)
    );
  }

}
