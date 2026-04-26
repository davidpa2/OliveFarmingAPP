import { Injectable } from '@angular/core';
import { CoreProvider } from './core';

@Injectable({
  providedIn: 'root'
})
export class SeasonsService {
  private core!: CoreProvider;
  seasons: string[] = [];
  currentSeason: string = '';
  currentSeasonLiters: number = 0;

  constructor() { }

  public init = (core: CoreProvider) => {
    this.core = core;
    this.initChecks();
  };

  private initChecks() {
    this.core.api.seasons.getAllSeasons$Json().subscribe({
      next: res => {
        this.seasons = res;
        this.setCurrentSeason();

        if (!this.seasons.includes(this.currentSeason)) {
          this.core.api.seasons.addSeason({ body: { name: this.currentSeason } }).subscribe({
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
          this.core.api.rain.seasonLiters$Json({seasonName: this.currentSeason}).subscribe({
            next: res => {
              this.currentSeasonLiters = res.liters || 0;
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
