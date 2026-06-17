import { inject, Injectable } from '@angular/core';
import { CoreProvider } from './core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from './api/api-configuration';
import { deleteRainLog$Json, DeleteRainLog$Json$Params, findBySeason$Json, FindBySeason$Json$Params, newRainLog$Json, seasonLiters$Json, SeasonLiters$Json$Params } from './api/functions';
import { RainLog, RainLogCreateDto, SeasonLitersDto } from './api/models';

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

  public findBySeason(
    data: FindBySeason$Json$Params,
    cbSuccess: (rainLogs: RainLog[]) => void,
    cbErr: Function
  ) {

    const handleErr = (err: any) => {
      if (cbErr) {
        cbErr(err);
      } else {
        this.core.errorToast();
        console.error('Error in FindBySeason request', err);
      }
    };

    findBySeason$Json(this.http, this.apiConfig.rootUrl, data).subscribe({
      next: res => {
        if (res) {
          if (cbSuccess) cbSuccess(res.body);
        }
      },
      error: (err: any) => {
        handleErr(err);
      }
    })
  }

  public seasonLiters(
    data: SeasonLiters$Json$Params,
    cbSuccess: (rainLogs: SeasonLitersDto) => void,
    cbErr: Function
  ) {

    const handleErr = (err: any) => {
      if (cbErr) {
        cbErr(err);
      } else {
        this.core.errorToast();
        console.error('Error in FindBySeason request', err);
      }
    };

    seasonLiters$Json(this.http, this.apiConfig.rootUrl, data).subscribe({
      next: res => {
        if (res) {
          if (cbSuccess) cbSuccess(res.body);
        }
      },
      error: err => {
        handleErr(err);
      }
    })
  }
}
