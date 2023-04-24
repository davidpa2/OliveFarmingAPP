import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth/auth.service';
import { IonLoading, NavController, ToastController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class CoreProvider {

  constructor(
    public api: ApiService,
    public auth: AuthService,
    public navCtrl: NavController,
    public toastCtrl: ToastController
  ) {
    this.auth.init(this);
  }

  public get user() {
    return this.auth.user || undefined;
  };
  public get isLoggedIn() { return this.auth.token !== ''; };


  public async errorToast(loading?: IonLoading, message: any | string = null, duration: number = 10000) {
    if (loading) { loading.dismiss(); }

    if (typeof message != 'string' && message != null) {
      if (message.status && message.status === 401 && this.isLoggedIn) {
        this.auth.logout(() => this.navCtrl.navigateRoot('/login?msg=expired'));
      }
      message = this.fetchErrMsg(message.error);
    }

    return await (await this.toastCtrl.create({
      message: message || 'Se ha producido un error, inténtelo de nuevo más tarde',
      duration: duration || 5000,
      color: 'danger',
      buttons: [{ text: 'OK', role: 'cancel' }]
    })).present();
  }

  public fetchErrMsg(err: any) {
    if (err.error) {return err.error;}
    if (err.errors) {
      let msg = 'Se han producido los siguientes errores: ';
      // eslint-disable-next-line guard-for-in
      for (const itm in err.errors) {
        msg += '\n- '+err.errors[itm].toString();
      }
      return msg;
    }
    if (Object.getPrototypeOf(err).toString().indexOf('ProgressEvent')) {
      return 'Se ha producido un error de comunicación, por favor, compruebe su conexión.';
    }
  }

  navigate(route: string) {
    this.navCtrl.navigateForward(route);
  }
}
