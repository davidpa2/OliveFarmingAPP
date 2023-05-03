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

import { NewRainLog } from '../models/new-rain-log';
import { Rain } from '../models/rain';
import { RainWithRelations } from '../models/rain-with-relations';

@Injectable({
  providedIn: 'root',
})
export class RainControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation rainControllerFindOrderedBySeason
   */
  static readonly RainControllerFindOrderedBySeasonPath = '/rain/orderedBySeason';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOrderedBySeason()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOrderedBySeason$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Rain>> {

    const rb = new RequestBuilder(this.rootUrl, RainControllerService.RainControllerFindOrderedBySeasonPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Rain>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findOrderedBySeason$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOrderedBySeason(params?: {
  },
  context?: HttpContext

): Observable<Rain> {

    return this.findOrderedBySeason$Response(params,context).pipe(
      map((r: StrictHttpResponse<Rain>) => r.body as Rain)
    );
  }

  /**
   * Path part for operation rainControllerFindBySeason
   */
  static readonly RainControllerFindBySeasonPath = '/rain/season/{season}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findBySeason()` instead.
   *
   * This method doesn't expect any request body.
   */
  findBySeason$Response(params: {
    season: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<RainWithRelations>>> {

    const rb = new RequestBuilder(this.rootUrl, RainControllerService.RainControllerFindBySeasonPath, 'get');
    if (params) {
      rb.path('season', params.season, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<RainWithRelations>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findBySeason$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findBySeason(params: {
    season: string;
  },
  context?: HttpContext

): Observable<Array<RainWithRelations>> {

    return this.findBySeason$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<RainWithRelations>>) => r.body as Array<RainWithRelations>)
    );
  }

  /**
   * Path part for operation rainControllerFind
   */
  static readonly RainControllerFindPath = '/rain';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `find()` instead.
   *
   * This method doesn't expect any request body.
   */
  find$Response(params?: {
    filter?: any;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<RainWithRelations>>> {

    const rb = new RequestBuilder(this.rootUrl, RainControllerService.RainControllerFindPath, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<RainWithRelations>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `find$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  find(params?: {
    filter?: any;
  },
  context?: HttpContext

): Observable<Array<RainWithRelations>> {

    return this.find$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<RainWithRelations>>) => r.body as Array<RainWithRelations>)
    );
  }

  /**
   * Path part for operation rainControllerCreate
   */
  static readonly RainControllerCreatePath = '/rain';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create$Response(params?: {
    body?: NewRainLog
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Rain>> {

    const rb = new RequestBuilder(this.rootUrl, RainControllerService.RainControllerCreatePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Rain>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `create$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create(params?: {
    body?: NewRainLog
  },
  context?: HttpContext

): Observable<Rain> {

    return this.create$Response(params,context).pipe(
      map((r: StrictHttpResponse<Rain>) => r.body as Rain)
    );
  }

}
