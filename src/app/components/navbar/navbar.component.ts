import { Component, OnInit } from '@angular/core';
import { CoreProvider } from '../../services/core'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor(public core: CoreProvider) { }

  ngOnInit() { }

  logout() {
    this.core.auth.logout(() => {      
      this.core.popoverCtrl.dismiss();
      this.core.navCtrl.navigateRoot('/');
    });
  }
}
