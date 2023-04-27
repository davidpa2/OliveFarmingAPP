import { Component, OnInit } from '@angular/core';
import { CoreProvider } from 'src/app/services/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage  implements OnInit {

  constructor(public core: CoreProvider) { }

  ngOnInit() {}

}