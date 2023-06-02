import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth/auth.service';
import { CoreProvider } from './services/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiAuthInterceptor } from './services/auth/api-auth.interceptor';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ApiModule } from './services/api/api.module';
import { environment } from 'src/environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from './components/components.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    ApiModule.forRoot({rootUrl:environment.endpoint}),
    AppRoutingModule,
    ComponentsModule
  ],
  providers: [
    ApiService,
    AuthService,
    CoreProvider,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: ApiAuthInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
