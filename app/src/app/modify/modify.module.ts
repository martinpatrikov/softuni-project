import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import { ModifyRoutingModule } from './modify-routing.module';
import { ModifyComponent } from './modify/modify.component';



@NgModule({
  declarations: [
    EditComponent,
    ModifyComponent
  ],
  imports: [
    CommonModule,
    ModifyRoutingModule
  ]
})
export class ModifyModule { }
