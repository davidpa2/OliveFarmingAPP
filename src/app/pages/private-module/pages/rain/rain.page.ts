import { Component, OnInit } from '@angular/core';
import { RainWithRelations } from 'src/app/services/api/models';
import { CoreProvider } from 'src/app/services/core';

export interface RainSeasons {
  [season: string]: RainWithRelations[];
}

@Component({
  selector: 'app-rain',
  templateUrl: './rain.page.html',
  styleUrls: ['./rain.page.scss'],
})
export class RainPage implements OnInit {
  selectedTab = '';
  rainDate = '';
  liters!: number;

  rainSeasons: RainSeasons = {};

  constructor(public core: CoreProvider) {
    if (!this.core.season.currentSeason) this.core.season.setCurrentSeason();
    this.selectedTab = this.core.season.currentSeason;
  }

  ngOnInit() {
    this.updateSeason(this.selectedTab);
  }

  saveRainLog() {
    this.core.api.rain.create({ body: { date: this.rainDate, liters: this.liters, season: this.selectedTab } }).subscribe({
      next: res => {
        if (res) {
          console.log(res);
          this.updateSeason(this.selectedTab);
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  updateSeason(season: string) {
    this.core.api.rain.findBySeason({ season }).subscribe({
      next: res => {
        if (res) {
          this.rainSeasons[season] = res;
        }
        console.log(this.rainSeasons);
      }
    })

  }

  changeDate(event: any) {
    this.rainDate = event.detail.value;
  }

}
