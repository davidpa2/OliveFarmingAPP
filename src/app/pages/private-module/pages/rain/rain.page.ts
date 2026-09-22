import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EditRainLogDto, RainLog, SeasonLitersDto } from 'src/app/services/api/models';
import { CoreProvider } from 'src/app/services/core';
import { Chart, registerables } from 'chart.js';
import { DatePipe } from '@angular/common';

export interface RainSeasons {
  [season: string]: RainLog[];
}
export interface SeasonsTotalLiters {
  [season: string]: number;
}

@Component({
  selector: 'app-rain',
  templateUrl: './rain.page.html',
  styleUrls: ['./rain.page.scss'],
  standalone: false
})
export class RainPage implements OnInit {
  formMode: "hidden" | "insert" | "edit" = 'hidden';
  selectedTab = '';
  rainDate = '';
  liters!: number | null;
  editingRainLog: RainLog;
  //Properties to manage the animation of a new rain log
  newLogPosition: number | null = null;
  deleteLogPosition: number | null = null;

  rainSeasons: RainSeasons = {};
  previousRainLogs: RainLog[] = [];
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

  manageRainForm() {
    switch (this.formMode) {
      case 'insert':
        this.saveRainLog();
        break;
      case 'edit':
        this.editRainLog();
        break;
    
      default:
        break;
    }
  }

  saveRainLog() {
    this.core.rain.saveRainLog({
      date: this.rainDate, liters: this.liters!, seasonName: this.selectedTab
    }, () => {
      this.previousRainLogs = this.rainSeasons[this.selectedTab];
      this.updateSeason(this.selectedTab, true);
      this.liters = null;
      this.rainDate = '';

    }, (err: any) => {
      console.log(err);
    });
  }

  setEditForm(id: number) {
    this.formMode = 'edit';
    
    var logToEdit: RainLog = this.rainSeasons[this.selectedTab].find(x => x.id === id);
    if (!logToEdit) {
      console.error('No se encontró el registro en el array local');
      return;
    }

    this.liters = logToEdit.liters;
    this.rainDate = logToEdit.date;
    this.editingRainLog = logToEdit;
  }

  editRainLog() {
    var rainLogDto: EditRainLogDto = { id: this.editingRainLog.id, seasonName: this.selectedTab, date: this.rainDate, liters: this.liters };

    this.core.rain.editRainLog(rainLogDto,
      () => {
        this.updateSeason(this.selectedTab, false);

        this.liters = null;
        this.rainDate = '';
        this.formMode = 'hidden';
      }, (err: any) => {
        console.log(err);
      }
    )
  }

  deleteRainLog(id: number) {
    this.newLogPosition = null;

    this.core.rain.deleteRainLog({ id },
      () => {
        this.previousRainLogs = this.rainSeasons[this.selectedTab];
        this.updateSeason(this.selectedTab, false, true);
      }, (err: any) => {
        console.log(err);
      }
    );
  }

  updateSeason(season: string, animation: boolean, deleting: boolean = false) {
    this.destroyChart(false, false);

    this.core.rain.findBySeason({ seasonName: season },
      (res: RainLog[]) => {
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
      }, (err: any) => {
        console.log(err);
      }
    );
  }

  changeDate(event: any) {
    this.previousRainLogs = [];
    this.rainDate = event.detail.value;
  }

  updateSeasonLiters() {
    this.core.rain.seasonLiters({ seasonName: this.selectedTab },
      (res: SeasonLitersDto) => {
        if (res.liters) {
          this.seasonsTotalLiters[this.selectedTab] = res.liters;
          console.log(this.seasonsTotalLiters[this.selectedTab]);
          this.createChart();
        } else {
          this.destroyChart(true);
        }
      }, (err: any) => {
        console.log(err)
      }
    );
  }

  createChart() {
    this.ctx = this.rainChart.nativeElement.getContext('2d');

    var labels: string[] = []
    var liters: number[] = []

    this.rainSeasons[this.selectedTab].forEach(element => {
      labels.push(this.datePipe.transform(element.date)!);
      liters.push(element.liters || 0);
    });

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
      if (animation) chartDiv.classList.add('disappearTr');

      if (hideChart) {
        setTimeout(() => {
          if (animation) chartDiv.classList.add('dNone');
          this.chart.destroy();
        }, 2000);
      } else {
        this.chart.destroy();
      }
    }
  }
}
