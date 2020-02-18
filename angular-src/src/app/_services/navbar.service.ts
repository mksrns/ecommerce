import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  token:String; 
  redirectUrl:String;

  constructor(private router:Router, private _http:HttpClient) { }

  getAuthorizationToken(){
    const token = JSON.parse(localStorage.getItem('token'));
    return token;
  }

  isLoggedIn(){
    if(localStorage.getItem('token')) {
      if(jwt_decode(localStorage.getItem('token')).email === localStorage.getItem('currentUser')
        // && jwt_decode(localStorage.getItem('token')).exp * 1000 > Date.now()
        ) {
          return true;
      } 
    } 
    return false;
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

}
