import { Component, OnInit } from '@angular/core';
import { CoreProvider } from '../../services/core'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  popoverEvent: any = null;
  isPopoverOpen = false;

  constructor(public core: CoreProvider) { }

  ngOnInit() { }

  presentPopover(e: Event) {
    this.popoverEvent = e;
    this.isPopoverOpen = true;
  }

  logout() {
    this.core.auth.logout(async () => {
      await this.core.popoverCtrl.dismiss();

      this.popoverEvent = null;
      this.isPopoverOpen = false;

      this.core.navCtrl.navigateRoot('/');
    });
  }
}
