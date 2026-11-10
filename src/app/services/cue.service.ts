import { inject, Injectable } from '@angular/core';
import { CoreProvider } from './core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from './api/api-configuration';
import { createTreatment$Json, CreateTreatment$Json$Params, deleteTreatment, getPlots$Json, getTreatments$Json, updateTreatment$Json, UpdateTreatment$Json$Params } from './api/functions';
import { PlotDto, TreatmentDto } from './api/models';

@Injectable({
  providedIn: 'root'
})
export class CueService {
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

  public getTreatments(
    cbSuccess: (treatments: TreatmentDto[]) => void,
    cbErr: Function
  ) {
    const handleErr = (err: any) => {
      if (cbErr) {
        cbErr(err);
      } else {
        this.core.errorToast();
        console.error('Error in GetTreatments request', err);
      }
    };

    getTreatments$Json(this.http, this.apiConfig.rootUrl).subscribe({
      next: res => {
        if (res && cbSuccess) cbSuccess(res.body);
      },
      error: err => handleErr(err)
    });
  }

  public updateTreatment(
  data: UpdateTreatment$Json$Params,
  cbSuccess: (res: TreatmentDto) => void,
  cbErr: Function
) {
  const handleErr = (err: any) => {
    if (cbErr) cbErr(err);
    else {
      this.core.errorToast();
      console.error('Error in UpdateTreatment request', err);
    }
  };

  updateTreatment$Json(this.http, this.apiConfig.rootUrl, data).subscribe({
    next: res => {
      if (res && cbSuccess) cbSuccess(res.body as TreatmentDto);
    },
    error: (err: any) => handleErr(err)
  });
}

  public deleteTreatment(
    id: number,
    cbSuccess: Function,
    cbErr: Function
  ) {
    const handleErr = (err: any) => {
      if (cbErr) cbErr(err);
      else {
        this.core.errorToast();
        console.error('Error in DeleteTreatment request', err);
      }
    };

    deleteTreatment(this.http, this.apiConfig.rootUrl, { id }).subscribe({
      next: () => {
        if (cbSuccess) cbSuccess();
      },
      error: (err: any) => handleErr(err)
    });
  }

  public getPlots(
    cbSuccess: (plots: PlotDto[]) => void,
    cbErr: Function
  ) {

    const handleErr = (err: any) => {
      if (cbErr) {
        cbErr(err);
      } else {
        this.core.errorToast();
        console.error('Error in GetPlots request', err);
      }
    };

    getPlots$Json(this.http, this.apiConfig.rootUrl).subscribe({
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

  public createTreatment(
    data: CreateTreatment$Json$Params,
    cbSuccess: Function,
    cbErr: Function
  ) {

    const handleErr = (err: any) => {
      if (cbErr) {
        cbErr(err);
      } else {
        this.core.errorToast();
        console.error('Error in createTreatment request', err);
      }
    };

    createTreatment$Json(this.http, this.apiConfig.rootUrl, data).subscribe({
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
}
