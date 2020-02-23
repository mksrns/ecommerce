import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
declare var $: any;
import { CommonServicesService } from 'src/app/_services/commonservice.service';
import * as jwt_decode from 'jwt-decode';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from 'src/app/_services/navbar.service';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loginForm:FormGroup;
  forgotPasswordForm:FormGroup;
  signupForm:FormGroup;
  is_logged_in: boolean;
  signin:boolean = true;
  forgotPassword:boolean = false;
  signup:boolean = false;
  userData: {};

  constructor(
    private formbuilder: FormBuilder, 
    private router: Router, 
    public toastr: ToastrService,
    private authService: AuthService,
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
      email: ['', [Validators.required, Validators.email, Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });

    this.forgotPasswordForm = this.formbuilder.group({ 
      email: ['', [Validators.required, Validators.email, Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });

    this.signupForm = this.formbuilder.group({ 
      firstName:['', [Validators.required]],
      username:['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(9)]]
      // phone: ['', [Validators.required, Validators.min(1000000000), Validators.max(999999999999)]],
    });
  }

  onSignupSubmit() {
    let userData = this.signupForm.value;
    this.commonServ.post('api/auth/register', userData).subscribe(
      (data:any) => {
        this.toastr.success(data.message);
        $("#loginModal").modal("hide");
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }

  onForgotPasswordSubmit() {
    let userData = this.forgotPasswordForm.value;
    this.commonServ.post('api/auth/recover', userData).subscribe(
      (data:any) => {
        this.toastr.success(data.message);
        $("#loginModal").modal("hide");
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }

  onLoginSubmit(){
    let userData = this.loginForm.value;
    this.commonServ.post('api/auth/login', userData).subscribe(
      (data:any) => {
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('currentUser', jwt_decode(data.token).email);
        // this.navbarServ.isLoggedIn();
        console.log(jwt_decode(data.token));
        if(jwt_decode(data.token).is_admin) {
          this.router.navigate(['/admin-dashboard']);
        } else if(jwt_decode(data.token).is_seller) {
          this.router.navigate(['/seller-dashboard']);
        } else {
          this.ngOnInit();
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

  socialLogin(provider) {
    if(provider == 'google') {
      this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((data:any) => {
        this.userData = {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          profileImage: data.photoUrl,
          user_type: 'user',
          isVerified: true,
          token: data.idToken,
          provider: data.provider
        }
        this.commonServ.post('api/auth/social', this.userData).subscribe((data:any) => {
          localStorage.setItem('token', JSON.stringify(data.token));
          localStorage.setItem('currentUser', jwt_decode(data.token).email);
          if(jwt_decode(data.token).is_admin) {
            this.router.navigate(['/admin-dashboard']);
          } else if(jwt_decode(data.token).is_seller) {
            this.router.navigate(['/seller-dashboard']);
          } else {
            this.ngOnInit();
          }
          $("#loginModal").modal("hide");
          this.toastr.success('login successfull');
        },
        error => {
          this.toastr.error(error.error.message);
        });
      });
    } else if(provider == 'facebook') {
      this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((data:any) => {
        console.log(data);
        this.userData = {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          profileImage: data.photoUrl,
          user_type: 'user',
          isVerified: true,
          token: data.authToken,
          provider: data.provider
        }
        console.log(this.userData);
        this.commonServ.post('api/auth/social', this.userData).subscribe((data:any) => {
          localStorage.setItem('token', JSON.stringify(data.token));
          localStorage.setItem('currentUser', jwt_decode(data.token).email);
          if(jwt_decode(data.token).is_admin) {
            this.router.navigate(['/admin-dashboard']);
          } else if(jwt_decode(data.token).is_seller) {
            this.router.navigate(['/seller-dashboard']);
          } else {
            this.ngOnInit();
          }
          $("#loginModal").modal("hide");
          this.toastr.success('login successfull');
        },
        error => {
          this.toastr.error(error.error.message);
        });
      });
    }
  }

  checkSignin(status) {
    if(status == 'signin') {
      this.forgotPassword = false;
      this.signup = false;
      this.signin = true;
    } else if(status == 'signup') {
      this.forgotPassword = false;
      this.signup = true;
      this.signin = false;
    } else if(status == 'forgotPassword') {
      this.forgotPassword = true;
      this.signin = false;
      this.signup = false;
    }
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