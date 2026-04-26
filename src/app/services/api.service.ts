import { Injectable } from '@angular/core';
import { RainService, SeasonsService, UsersService } from './api/services';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public user: UsersService,
    public rain: RainService,
    public seasons: SeasonsService
  ) { }
}
