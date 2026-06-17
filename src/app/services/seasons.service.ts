import { inject, Injectable } from '@angular/core';
import { CoreProvider } from './core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from './api/api-configuration';
import { addSeason, getAllSeasons$Json, seasonLiters$Json } from './api/functions';

@Injectable({
  providedIn: 'root'
})
export class SeasonsService {
  private core!: CoreProvider;
  seasons: string[] = [];
  currentSeason: string = '';
  currentSeasonLiters: number = 0;

  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfiguration);

  constructor() { }

  public init = (core: CoreProvider) => {
    this.core = core;
    this.initChecks();
  };

  private initChecks() {
    getAllSeasons$Json(this.http, this.apiConfig.rootUrl).subscribe({
      next: res => {
        this.seasons = res.body;
        this.setCurrentSeason();

        if (!this.seasons.includes(this.currentSeason)) {
          addSeason(this.http, this.apiConfig.rootUrl, { body: { name: this.currentSeason } }).subscribe({
            next: res => {
              this.seasons.push(this.currentSeason)
              this.currentSeasonLiters = 0;
              console.log('A new season has been created');
            },
            error: err => {
              console.log(err);
            }
          })
        } else {
          seasonLiters$Json(this.http, this.apiConfig.rootUrl, {seasonName: this.currentSeason}).subscribe({
            next: res => {
              this.currentSeasonLiters = res.body.liters || 0;
            },
            error: err => {
              console.log(err);
            }
          })
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  /**
   * An agricultural season is between september and august of the following year
   */
  public setCurrentSeason() {
    var currentYear = new Date().getFullYear().toString().slice(2);
    var currentMonth = new Date().getMonth() + 1;

    if (currentMonth >= 8) {
      this.currentSeason = `${currentYear}/${parseInt(currentYear) + 1}`
    } else {
      this.currentSeason = `${parseInt(currentYear) - 1}/${currentYear}`
    }
  }
}
