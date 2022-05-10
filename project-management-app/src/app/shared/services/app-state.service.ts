import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor() {}

  public userId = new BehaviorSubject('');
}
