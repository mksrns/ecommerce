import { Component } from '@angular/core';
import { CommonServicesService } from './_services/commonservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aecoz';
  // navHidden: boolean = false;
  constructor(private commonServ:CommonServicesService) {}
  ngOnInit() {
    // this.commonServ.hideNav.subscribe(data => this.navHidden = data);
  }
}
