import { Injectable } from '@angular/core';
import { ApiConfiguration } from './api/api-configuration';
import { UsersService } from './api/fn/users';
import { RainService } from './api/fn/rain';
import { SeasonsService } from './api/fn/rain';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public apiConfig: ApiConfiguration,
    public user: UsersService,
    public rain: RainService,
    public seasons: SeasonsService
  ) {
    this.apiConfig.rootUrl = environment.endpoint;
  }
}
