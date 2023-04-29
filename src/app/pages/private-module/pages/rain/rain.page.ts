import { Component, OnInit } from '@angular/core';
import { CoreProvider } from 'src/app/services/core';

@Component({
  selector: 'app-rain',
  templateUrl: './rain.page.html',
  styleUrls: ['./rain.page.scss'],
})
export class RainPage implements OnInit {
  selectedTab = '';
  rainDate = '';
  liters!: number;

  constructor(public core: CoreProvider) {
    if (!this.core.season.currentSeason) this.core.season.setCurrentSeason();
    this.selectedTab = this.core.season.currentSeason;
  }

  ngOnInit() { }

  saveRainLog() {
    this.core.api.rain.create({ body: { date: this.rainDate, liters: this.liters, season: this.selectedTab } }).subscribe({
      next: res => {
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  changeDate(event: any) {
    this.rainDate = event.detail.value;
  }

}
