import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoreProvider } from 'src/app/services/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;
  isSubmitted: boolean = false;
  errorMessage: string = "";

  passwordType: 'password' | 'text' = 'password';

  constructor(public core: CoreProvider) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required])
    })
  }

  togglePassword() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  async login() {
    this.isSubmitted = true;
    this.errorMessage = ""; // Clear previous errors

    if (this.loginForm.valid) {
      this.core.auth.login({
        email: this.loginForm.controls['email'].value,
        password: this.loginForm.controls['password'].value
      }, () => {
        this.loginForm.reset();
        this.errorMessage = "";
        this.core.router.navigate(["/private/dashboard"]);

      }, (err: any) => {
        console.error("Error de backend:", err);

        // Network error
        if (err.status === 0) {
          this.errorMessage = "No se pudo conectar con el servidor. Revisa tu conexión.";
          return;
        }

        // Credentials error
        if (err.status === 401 || err.status === 400) {
          this.errorMessage = err.error?.errors?.[0] || err.error?.message || "Email o contraseña incorrectos.";
          return;
        }

        // Internal server error
        if (err.status >= 500) {
          this.errorMessage = "Error interno del servidor. Inténtalo de nuevo más tarde.";
          return;
        }

        // Generic fallback
        this.errorMessage = "Ha ocurrido un error inesperado al iniciar sesión.";
      });
    } else {
      this.loginForm.markAllAsTouched();

      let toast = await this.core.toastCtrl.create({
        message: "Datos incorrectos. Revisa el formulario.",
        duration: 5000,
        color: 'danger',
        buttons: [{ text: 'OK', role: 'cancel' }]
      });

      toast.present();
    }
  }

  get myForm() {
    return this.loginForm.controls;
  }
}
