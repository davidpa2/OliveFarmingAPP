import { Component, ViewChild } from '@angular/core';
import { IonContent, ViewWillEnter } from '@ionic/angular';
import { CoreProvider } from 'src/app/services/core';

@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.scss'],
    standalone: false
})
export class IndexPage  implements ViewWillEnter {

  @ViewChild(IonContent, { static: false }) content!: IonContent;

  constructor(public core: CoreProvider) { }

  ionViewWillEnter() {
    if (this.content) {
      this.content.scrollToTop(0); 
    }
  }

}
