import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoreProvider } from 'src/app/services/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;

  constructor(private core: CoreProvider) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required])
    })
  }

  login() {
    this.core.auth.login({
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    }, () => {
      console.log('Logged in');
    }, (err: any) => {
      console.log(err);
    })
  }

  hey() {
    console.log(environment.authToken);
    
  }
}
