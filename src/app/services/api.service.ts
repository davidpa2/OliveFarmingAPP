import { Injectable } from '@angular/core';
import { RainControllerService, SeasonsControllerService, UserControllerService } from './api/services';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public user: UserControllerService,
    public rain: RainControllerService,
    public seasons: SeasonsControllerService
  ) { }
}
