import { inject, Injectable } from '@angular/core';
import { CoreProvider } from './core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from './api/api-configuration';
import { deleteRainLog$Json, DeleteRainLog$Json$Params, newRainLog$Json } from './api/functions';
import { RainLogCreateDto } from './api/models';

@Injectable({
  providedIn: 'root'
})
export class RainService {
  private core!: CoreProvider;

  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);

  constructor() { }

  public init = (core: CoreProvider) => {
    this.core = core;
    this.initChecks();
  };

  private initChecks() {

  }

  public saveRainLog(
    data: RainLogCreateDto,
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

    newRainLog$Json(this.http, this.apiConfig.rootUrl, { body: data }).subscribe({
      next: res => {
        if (res) {
          if (cbSuccess) cbSuccess();
        }
      },
      error: (err: any) => {
        handleErr(err);
      }
    })
  }

  public deleteRainLog(
    data: DeleteRainLog$Json$Params,
    cbSuccess: Function,
    cbErr: Function
  ) {

    const handleErr = (err: any) => {
      if (cbErr) {
        cbErr(err);
      } else {
        this.core.errorToast();
        console.error('Error in deleteRainLog request', err);
      }
    };

    deleteRainLog$Json(this.http, this.apiConfig.rootUrl, data).subscribe({
      next: res => {
        if (res) {
          if (cbSuccess) cbSuccess();
        }
      },
      error: (err: any) => {
        handleErr(err);
      }
    })
  }
}
