import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
    });
  }

}
