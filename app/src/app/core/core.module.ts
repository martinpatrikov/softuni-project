import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material.module';
import { AppRoutingModule } from '../app-routing.module';
import { UserService } from './services/user.service';
import { appInterceptorProvider } from './app-interceptor';
import { FileService } from './services/file.service';
import { AudioService } from './services/audio.service';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    UserService,
    appInterceptorProvider,
    FileService,
    AudioService
  ]
})
export class CoreModule { }
