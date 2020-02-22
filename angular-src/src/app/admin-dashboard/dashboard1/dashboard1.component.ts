import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from 'src/app/_services/commonservice.service';

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss']
})
export class Dashboard1Component implements OnInit {

  constructor(private commonServ: CommonServicesService) { }

  ngOnInit() {
    this.commonServ.getAll('api/user').subscribe((data:any) => {
      console.log(data);
    });
  }

}
