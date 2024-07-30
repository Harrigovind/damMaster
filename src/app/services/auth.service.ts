import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  loginStatus = this.isLoggedInSubject.asObservable();

  setLoginStatus(status:boolean):void{
    this.isLoggedInSubject.next(status);
  }

  getLoginStatus(): boolean {
    return this.isLoggedInSubject.value;
  }
}
