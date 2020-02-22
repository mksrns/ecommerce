import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from 'src/app/_services/commonservice.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private commonServ: CommonServicesService) { }

  ngOnInit() {
    this.commonServ.getAll('api/product').subscribe((data:any) => {
      console.log(data);
    });
  }

}
