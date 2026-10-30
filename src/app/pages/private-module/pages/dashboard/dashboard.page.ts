import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { SeasonLitersDto } from 'src/app/services/api/models';
import { CoreProvider } from 'src/app/services/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements ViewWillEnter {

  constructor(public core: CoreProvider) { }

  ionViewWillEnter(): void {
    if (this.core.season.currentSeasonLiters === null) {
      this.core.rain.seasonLiters({ seasonName: this.core.season.currentSeason },
        (res: SeasonLitersDto) => {
          if (res.liters) {
            this.core.season.currentSeasonLiters = res.liters;
          }
        }, (err: any) => {
          this.core.season.currentSeasonLiters = null;
          console.log(err)
        }
      );
    }
  }
}