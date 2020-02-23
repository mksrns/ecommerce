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
  visible: boolean;

  constructor(private router:Router, private _http:HttpClient) { this.visible = false; }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }
  
  getAuthorizationToken(){
    const token = JSON.parse(localStorage.getItem('token'));
    return token;
  }

  isSellerLoggedIn(){
    if(localStorage.getItem('token')) {
      if(jwt_decode(localStorage.getItem('token')).email === localStorage.getItem('currentUser')
        && jwt_decode(localStorage.getItem('token')).is_seller  
        ) {
          return true;
      } 
    } 
    return false;
  }

  isAdminLoggedIn(){
    if(localStorage.getItem('token')) {
      if(jwt_decode(localStorage.getItem('token')).email === localStorage.getItem('currentUser')
        && jwt_decode(localStorage.getItem('token')).is_admin  
      // && jwt_decode(localStorage.getItem('token')).exp * 1000 > Date.now()
        ) {
          return true;
      } 
    } 
    return false;
  }

  isUserLoggedIn(){
    if(localStorage.getItem('token')) {
      if(jwt_decode(localStorage.getItem('token')).email === localStorage.getItem('currentUser')
        && !jwt_decode(localStorage.getItem('token')).is_admin 
        && !jwt_decode(localStorage.getItem('token')).is_seller 
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

  logoutSellerAndAdmin() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

}
