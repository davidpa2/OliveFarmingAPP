import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UserControllerService } from './api/services';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public user: UserControllerService
  ) { }
}
