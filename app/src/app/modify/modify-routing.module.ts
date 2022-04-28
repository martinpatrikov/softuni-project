import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { ModifyComponent } from './modify/modify.component';

const routes: Routes = [
  {
    path: ':id',
    component: ModifyComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'delete',
  //   component: RegisterComponent,
  //   // canActivate: [AuthActivate],
  //   data: {
  //     authenticationRequired: false,
  //     authenticationFailureRedirectUrl: '/',
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyRoutingModule { }