import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonServicesService } from 'src/app/_services/commonservice.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {
  productForm:FormGroup;
  productData: {};
  constructor(
    private formbuilder: FormBuilder,
    private router: Router, 
    public toastr: ToastrService,
    private commonServ: CommonServicesService
    ) { }

  ngOnInit() {
    this.productForm = this.formbuilder.group({ 
      title:['', [Validators.required]],
      description:['', [Validators.required]],
      price:['', [Validators.required]],
      imagePath:['', [Validators.required]],
    });
  }

  onProductSubmit() {
    let productData = this.productForm.value;
    this.commonServ.post('api/product', productData).subscribe(
      (data:any) => {
        console.log(data);
        this.toastr.success('Product added successfully')
        // this.router.navigate(['all-products']);
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }

}
