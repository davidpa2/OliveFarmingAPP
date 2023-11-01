import { Injectable } from '@angular/core';
import { CoreProvider } from './core';

@Injectable({
  providedIn: 'root'
})
export class SeasonsService {
  app: any;
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
    this.core.api.seasons.find().subscribe({
      next: res => {
        this.seasons = res;
        this.setCurrentSeason();

        if (!this.seasons.includes(this.currentSeason)) {
          this.core.api.seasons.create({ body: { seasonCode: this.currentSeason } }).subscribe({
            next: res => {
              if (res) {
                this.seasons.push(res.seasonCode)
                this.currentSeasonLiters = 0;
                console.log('A new season has been created');
              }
            },
            error: err => {
              console.log(err);
            }
          })
        } else {
          this.core.api.rain.seasonLiters({season: this.currentSeason}).subscribe({
            next: res => {
              this.currentSeasonLiters = res.liters;
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
