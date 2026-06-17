import { Component, OnInit } from '@angular/core';
import { CoreProvider } from 'src/app/services/core';

@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.scss'],
    standalone: false
})
export class IndexPage  implements OnInit {

  constructor(public core: CoreProvider) { }

  ngOnInit() {}

}
