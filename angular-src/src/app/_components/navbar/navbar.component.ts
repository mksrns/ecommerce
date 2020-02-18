import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
declare var $: any;
import { CommonServicesService } from 'src/app/_services/commonservice.service';
import * as jwt_decode from 'jwt-decode';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/_services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loginForm:FormGroup;
  is_logged_in: boolean;

  constructor(
    private formbuilder: FormBuilder, 
    private router: Router, 
    public toastr: ToastrService,
    private navbarServ: NavbarService,
    private commonServ: CommonServicesService
  ) { 
    
  }

  ngOnInit() {
    $(document).ready(function(){
      $(function() {
        var header = $(".start-style");
        $(window).scroll(function() {    
          var scroll = $(window).scrollTop();
          if (scroll >= 10) {
            header.removeClass('start-style').addClass("scroll-on");
          } else {
            header.removeClass("scroll-on").addClass('start-style');
          }
        });
      });
      //Menu On Hover
      $('body').on('mouseenter mouseleave','.nav-item',function(e){
          if ($(window).width() > 750) {
            var _d=$(e.target).closest('.nav-item');_d.addClass('show');
            setTimeout(function(){
            _d[_d.is(':hover')?'addClass':'removeClass']('show');
            },1);
          }
      });	
    }); 

    if(localStorage.getItem('token')) {
      this.is_logged_in = true;
    } else {
      this.is_logged_in = false;
    }

    this.loginForm = this.formbuilder.group({ 
      email:['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onLoginSubmit(){
    let userData = this.loginForm.value;
    this.commonServ.post('api/auth/login', userData).subscribe(
      (data:any) => {
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('currentUser', jwt_decode(data.token).email);
        this.navbarServ.isLoggedIn();
        this.ngOnInit();
        if(localStorage.getItem('currentUser') === 'raunak948@gmail.com') {
          this.router.navigate(['/super-admin']);
        }
        $("#loginModal").modal("hide");
        this.toastr.success('login successfull');
      },
      error => {
        this.toastr.error(error.error.message);
      }
  );
  }

  logout() {
    this.navbarServ.logout();
    this.ngOnInit();
  }

  fbLogin() {
    this.commonServ.getAll('auth/facebook').subscribe((data:any) => {
      console.log(data);
    });
  }

  googleLogin() {
  const auth2 = (<any>window).gapi.auth2.getAuthInstance();
  auth2.signIn()
    .then(res => {
      const access_token = res.getAuthResponse().access_token;
      console.log(access_token);
      var email_id = '';
      this.commonServ.getAll('auth/google').subscribe((data:any) => {
        console.log(data);
      });
    });
  }
}


 // toastr functions
  // showSuccess() {
  //   this.toastr.success('Hello world!', 'Toastr fun!', {
  //     timeOut: 200000
  //   });
  // }
  // showError() {
  //   this.toastr.error('everything is broken', 'Major Error', {
  //     timeOut: 3000
  //   });
  // }
  // showWarning() {
  //   this.toastr.warning('everything is broken', 'Major Error', {
  //     timeOut: 3000
  //   });
  // }
  // showInfo() {
  //   this.toastr.info('everything is broken', 'Major Error', {
  //     timeOut: 3000
  //   });