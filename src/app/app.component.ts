import { Component } from '@angular/core';
import { ApiConfiguration } from './services/api/api-configuration';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: false
})
export class AppComponent {
  constructor(private apiConfig: ApiConfiguration) {
    this.apiConfig.rootUrl = environment.endpoint;
  }
}
