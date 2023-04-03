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

import { HelloResponse } from '../models/hello-response';

@Injectable({
  providedIn: 'root',
})
export class HelloControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation helloControllerHello
   */
  static readonly HelloControllerHelloPath = '/hello';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `hello()` instead.
   *
   * This method doesn't expect any request body.
   */
  hello$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<HelloResponse>> {

    const rb = new RequestBuilder(this.rootUrl, HelloControllerService.HelloControllerHelloPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<HelloResponse>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `hello$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  hello(params?: {
  },
  context?: HttpContext

): Observable<HelloResponse> {

    return this.hello$Response(params,context).pipe(
      map((r: StrictHttpResponse<HelloResponse>) => r.body as HelloResponse)
    );
  }

}
