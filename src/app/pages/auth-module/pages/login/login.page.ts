import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoreProvider } from 'src/app/services/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;
  isSubmitted: boolean = false;
  errorMessage: string = "";

  constructor(public core: CoreProvider) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required])
    })
  }

  async login() {
    this.isSubmitted = true;

    if (this.loginForm.valid) {
      this.core.auth.login({
        email: this.loginForm.controls['email'].value,
        password: this.loginForm.controls['password'].value
      }, () => {
        this.errorMessage = "";
        this.core.router.navigate(["/private/dashboard"]);
        
      }, (err: any) => {
        console.log(err);
        console.log(err.error.errors[0]);
        this.errorMessage = err.error.errors[0];
      })
    } else {
      this.loginForm.markAllAsTouched();
      
      let toast = await this.core.toastCtrl.create({
        message: "Datos incorrectos",
        duration: 5000,
        color: 'danger',
        buttons: [{ text: 'OK', role: 'cancel' }]
      });

      toast.present();
    }
  }

  get myForm() {
    // this.loginForm.
    return this.loginForm.controls;
  }
}
