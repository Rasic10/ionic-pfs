import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = "auth-token";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenitcationState = new BehaviorSubject(false);

  constructor(private _storage: Storage, private _platform: Platform ) { 
    _storage.create();
    
    this._platform.ready().then(() => {
      this.checkToken();
    });
  }

  login() {
    return this._storage.set(TOKEN_KEY, 'Bearer 123456').then(() => {
      this.authenitcationState.next(true);
    });
  }

  logout() { 
    return this._storage.remove(TOKEN_KEY).then(() => {
      this.authenitcationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenitcationState.value;
  }

  checkToken() {
    return this._storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenitcationState.next(true);
      }
    });
  }
}
