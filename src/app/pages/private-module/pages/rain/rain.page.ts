import { Component, OnInit } from '@angular/core';
import { RainWithRelations, SeasonLitersResponse } from 'src/app/services/api/models';
import { CoreProvider } from 'src/app/services/core';
import { Chart } from 'chart.js';

export interface RainSeasons {
  [season: string]: RainWithRelations[];
}
export interface SeasonsTotalLiters {
  [season: string]: number;
}

@Component({
  selector: 'app-rain',
  templateUrl: './rain.page.html',
  styleUrls: ['./rain.page.scss'],
})
export class RainPage implements OnInit {
  showNewRainLogForm = false;
  selectedTab = '';
  rainDate = '';
  liters!: number | null;
  //Properties to manage the animation of a new rain log
  newLogPosition: number | null = null;
  deleteLogPosition: number | null = null;

  rainSeasons: RainSeasons = {};
  previousRainLogs: RainWithRelations[] = [];
  seasonsTotalLiters: SeasonsTotalLiters = {};

  chart: any;

  constructor(public core: CoreProvider) {
    if (!this.core.season.currentSeason) this.core.season.setCurrentSeason();
    this.selectedTab = this.core.season.currentSeason;
  }

  ngOnInit() {
    this.updateSeason(this.selectedTab, false);

    this.createChart();
  }

  saveRainLog() {
    this.core.api.rain.create({ body: { date: this.rainDate, liters: this.liters!, season: this.selectedTab } }).subscribe({
      next: res => {
        if (res) {
          this.previousRainLogs = this.rainSeasons[this.selectedTab];
          this.updateSeason(this.selectedTab, true);
          this.liters = null;
          this.rainDate = '';
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  deleteRainLog(uuid: string) {
    this.newLogPosition = null;
    this.core.api.rain.deleteById({ id: uuid }).subscribe({
      next: res => {
        if (res) {
          this.previousRainLogs = this.rainSeasons[this.selectedTab];
          this.updateSeason(this.selectedTab, false, true);
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  updateSeason(season: string, animation: boolean, deleting: boolean = false) {
    this.core.api.rain.findBySeason({ season }).subscribe({
      next: res => {
        if (res.length) {
          if (deleting) {
            document.getElementById(`${this.deleteLogPosition}`)?.classList.add('disappearTr');
            setTimeout(() => {
              this.rainSeasons[season] = res;
              this.deleteLogPosition = null;
            }, 2000);
          } else {
            if (animation) {
              this.newLogPosition = this.core.findNewIndex(res, this.previousRainLogs);
            }
            this.rainSeasons[season] = res;
          }
        } else {
          delete this.rainSeasons[season];
        }
        this.updateSeasonLiters();
        console.log(this.rainSeasons);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  changeDate(event: any) {
    this.previousRainLogs = [];
    this.rainDate = event.detail.value;
  }

  updateSeasonLiters() {
    this.core.api.rain.seasonLiters({ season: this.selectedTab }).subscribe({
      next: res => {
        this.seasonsTotalLiters[this.selectedTab] = res.liters;
        console.log(this.liters);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  createChart() {
    const canvas = <HTMLCanvasElement> document.getElementById("RainChart")!;
    const ctx = canvas.getContext("2d")!;

    this.chart = new Chart(ctx, {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        datasets: [
          {
            label: "Sales",
            data: ['467', '576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }
}
