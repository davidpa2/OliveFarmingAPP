import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoreProvider } from 'src/app/services/core';
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;

  constructor(public core: CoreProvider) {
    let app = initializeApp(environment.firebaseConfig);
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required])
    })
  }

  login() {
    // this.core.auth.login({
    //   email: this.loginForm.controls['email'].value,
    //   password: this.loginForm.controls['password'].value
    // }, () => {
    //   console.log('Logged in');
    // }, (err: any) => {
    //   console.log(err);
    // })

    const auth = getAuth();
    console.log(auth);
    
    createUserWithEmailAndPassword(auth, this.loginForm.controls['email'].value, this.loginForm.controls['password'].value)
      .then((userCredential) => {
        const user = userCredential.user
        console.log('user ', user);
        
      }).catch((error) => {
        console.error(error.code, error.message);
      })
  }

  hey() {
    console.log(environment.authToken);

  }
}
