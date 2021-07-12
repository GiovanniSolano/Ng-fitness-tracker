import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    FlexLayoutModule
  ]
})
export class SharedModule { }

