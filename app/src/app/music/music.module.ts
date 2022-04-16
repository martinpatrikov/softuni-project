import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { FileUploadModule } from 'ng2-file-upload';
import { CoreModule } from '../core/core.module';
import { PlaylistComponent } from './playlist/playlist.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule,
    FileUploadModule,
    CoreModule
  ]
})
export class MusicModule { }
