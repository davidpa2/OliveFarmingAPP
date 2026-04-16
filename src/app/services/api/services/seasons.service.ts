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
   * Path part for operation getAllSeasons
   */
  static readonly GetAllSeasonsPath = '/api/Seasons';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllSeasons$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSeasons$Plain$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<string>>> {

    const rb = new RequestBuilder(this.rootUrl, SeasonsService.GetAllSeasonsPath, 'get');
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
   * To access the full response (for headers, for example), `getAllSeasons$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSeasons$Plain(params?: {
  },
  context?: HttpContext

): Observable<Array<string>> {

    return this.getAllSeasons$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllSeasons$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSeasons$Json$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<string>>> {

    const rb = new RequestBuilder(this.rootUrl, SeasonsService.GetAllSeasonsPath, 'get');
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
   * To access the full response (for headers, for example), `getAllSeasons$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSeasons$Json(params?: {
  },
  context?: HttpContext

): Observable<Array<string>> {

    return this.getAllSeasons$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }

  /**
   * Path part for operation addSeason
   */
  static readonly AddSeasonPath = '/api/Seasons';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addSeason()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addSeason$Response(params?: {
    body?: SeasonsCreateDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SeasonsService.AddSeasonPath, 'post');
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
   * To access the full response (for headers, for example), `addSeason$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addSeason(params?: {
    body?: SeasonsCreateDto
  },
  context?: HttpContext

): Observable<void> {

    return this.addSeason$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getSeasonsCount
   */
  static readonly GetSeasonsCountPath = '/api/Seasons/count';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSeasonsCount$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSeasonsCount$Plain$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<SeasonCountDto>> {

    const rb = new RequestBuilder(this.rootUrl, SeasonsService.GetSeasonsCountPath, 'get');
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
   * To access the full response (for headers, for example), `getSeasonsCount$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSeasonsCount$Plain(params?: {
  },
  context?: HttpContext

): Observable<SeasonCountDto> {

    return this.getSeasonsCount$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<SeasonCountDto>) => r.body as SeasonCountDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSeasonsCount$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSeasonsCount$Json$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<SeasonCountDto>> {

    const rb = new RequestBuilder(this.rootUrl, SeasonsService.GetSeasonsCountPath, 'get');
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
   * To access the full response (for headers, for example), `getSeasonsCount$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSeasonsCount$Json(params?: {
  },
  context?: HttpContext

): Observable<SeasonCountDto> {

    return this.getSeasonsCount$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<SeasonCountDto>) => r.body as SeasonCountDto)
    );
  }

}
