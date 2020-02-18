import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatButtonModule, MatCheckboxModule, MatNativeDateModule, MatDatepickerModule, MatTableModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTooltipModule, MatDialogModule, MatCardModule} from '@angular/material';

const MaterialComponents = [
  MatToolbarModule,
  MatSidenavModule,
  ScrollingModule,
  MatProgressSpinnerModule,
  LayoutModule,
  MatDialogModule,
  MatIconModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatCardModule,
  MatButtonModule,
  MatTableModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,

  //other whole page applicable modules
]

@NgModule({
  declarations: [],
  imports: [ 
    MaterialComponents
  ],
  exports: [ MaterialComponents ]
})
export class AngularMaterialModule { }