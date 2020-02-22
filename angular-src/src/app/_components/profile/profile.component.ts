import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonServicesService } from 'src/app/_services/commonservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private formbuilder: FormBuilder, 
    private router: Router, 
    public toastr: ToastrService,
    private commonServ: CommonServicesService) { }

  ngOnInit() {
    this.commonServ.getAll('api/user').subscribe((data:any) => {
      console.log(data);
    });
  }

}
