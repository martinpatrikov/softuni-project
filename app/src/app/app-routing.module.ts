import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ErrorComponent } from './error/error.component';
import { PlayerComponent } from './music/player/player.component';
import { PlaylistComponent } from './music/playlist/playlist.component';
import { UploadComponent } from './music/upload/upload.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PlayerComponent
  },
  {
    path: 'upload',
    canActivate: [AuthGuard],
    component: UploadComponent
  },
  {
    path: 'playlist',
    canActivate: [AuthGuard],
    component: PlaylistComponent
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
