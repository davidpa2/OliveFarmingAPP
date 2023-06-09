import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RainWithRelations } from 'src/app/services/api/models';
import { CoreProvider } from 'src/app/services/core';
import { Chart, registerables } from 'chart.js';
import { DatePipe } from '@angular/common';

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
  ctx: any;

  @ViewChild('RainChart') rainChart!: ElementRef;

  constructor(public core: CoreProvider, private datePipe: DatePipe) {
    Chart.register(...registerables)

    if (!this.core.season.currentSeason) this.core.season.setCurrentSeason();
    this.selectedTab = this.core.season.currentSeason;
  }

  ngOnInit() {
    this.updateSeason(this.selectedTab, false);
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
        if (res.liters) {
          this.seasonsTotalLiters[this.selectedTab] = res.liters;
          console.log(this.seasonsTotalLiters[this.selectedTab]);
          this.createChart();
        } else {
          this.destroyChart(true);
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  createChart() {
    this.ctx = this.rainChart.nativeElement.getContext('2d');

    var labels: string[] = []
    var liters: number[] = []

    this.rainSeasons[this.selectedTab].forEach(element => {
      labels.push(this.datePipe.transform(element.date)!);
      liters.push(element.liters)
    })
    if (liters.length) {
      this.destroyChart(false, false);
      console.log('Generating chart...');
      this.chart = new Chart(this.ctx, {
        type: 'bar', //this denotes tha type of chart

        data: {// values on X-Axis
          labels: labels.reverse(),
          datasets: [
            {
              label: `Litros de lluvia temporada ${this.selectedTab}`,
              data: liters.reverse(),
              backgroundColor: 'limegreen'
            },
            // {
            //   label: "Profit",
            //   data: ['542', '542', '536', '327', '17',
            //     '0.00', '538', '541'],
            //   backgroundColor: 'limegreen'
            // }
          ]
        },
        options: {
          aspectRatio: 2.5
        }
      });
      var chartDiv = document.getElementById("RainChart")!;
      chartDiv.classList.remove('dNone', 'disappearTr');
      chartDiv.classList.add('dBlock', 'appearTr');
    } else {
      this.destroyChart(true);
    }
  }

  destroyChart(animation: boolean, hideChart: boolean = true) {
    var chartDiv = document.getElementById("RainChart")!;
    if (this.chart) {
      if (animation) chartDiv.classList.add('disappearTr')
      
      if (hideChart) {
        setTimeout(() => {
          if (animation) chartDiv.classList.add('dNone')
          this.chart.destroy();
        }, 2000);
      } else {
        this.chart.destroy();
      }
    }
  }
}
