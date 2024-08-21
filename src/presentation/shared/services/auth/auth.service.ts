import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUserData() {
    return JSON.parse(localStorage.getItem('userData') as string)
  }
}
