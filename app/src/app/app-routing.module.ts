import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { PlayerComponent } from './music/player/player.component';
import { UploadComponent } from './music/upload/upload.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PlayerComponent
  },
  {
    path: 'upload',
    pathMatch: 'full',
    component: UploadComponent
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
