import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavbarService } from 'src/app/_services/navbar.service';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share() 
    );

  constructor(private navbarServ:NavbarService, 
    private breakpointObserver: BreakpointObserver, 
    private titleService: Title) { 
      this.titleService.setTitle('Dashboard');
  } 

  ngOnInit() {
    this.navbarServ.hide();
  }

  logout(){
    this.navbarServ.logoutSellerAndAdmin();
  }

}
