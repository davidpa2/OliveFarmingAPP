import { Component, OnInit } from '@angular/core';
import { CoreProvider } from 'src/app/services/core';

@Component({
  selector: 'app-rain',
  templateUrl: './rain.page.html',
  styleUrls: ['./rain.page.scss'],
})
export class RainPage  implements OnInit {
  selectedTab = '';

  constructor(public core: CoreProvider) {
    if (!this.core.season.currentSeason) this.core.season.setCurrentSeason();
    this.selectedTab = this.core.season.currentSeason;
  }

  ngOnInit() { }

}
