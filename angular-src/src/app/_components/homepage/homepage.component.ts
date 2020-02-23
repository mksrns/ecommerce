import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/_services/navbar.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private navbarServ: NavbarService) { }

  ngOnInit() {
    this.navbarServ.show();
  }

}
