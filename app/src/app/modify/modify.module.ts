import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import { ModifyRoutingModule } from './modify-routing.module';
import { ModifyComponent } from './modify/modify.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    EditComponent,
    ModifyComponent
  ],
  imports: [
    CommonModule,
    ModifyRoutingModule,
    FormsModule,
    // CoreModule
  ]
})
export class ModifyModule { }
