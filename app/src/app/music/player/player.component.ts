import { Component } from '@angular/core';
import { AudioService } from "../../core/services/audio.service";
import { FileService } from '../../core/services/file.service';
import { StreamState } from '../../shared/interfaces/stream-state';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  files: Array<any> = [];
  state: StreamState | undefined;
  currentFile: any = {};

  isFirstPlaying() {
    return false;
  }
  isLastPlaying() {
    return true;
  }
  constructor(
    private audioService: AudioService,
    private fileService: FileService
  ) {
    this.fileService.getFiles().subscribe((files: any) => { this.files = files; });
  }


  // this.fileService.getFiles().subscribe((files: any) => {
  //   this.filesI = files;
  // });

  openFile(file: any, index: any) {
    this.currentFile = { index };
    this.fileService.getFileByID(file._id).subscribe((file: any) => {console.log(file); this.currentFile.file = file});
    console.log(this.currentFile);
    this.audioService.stop();
    this.playStream(file.url);
  }
  onSliderChangeEnd(a: any): void { }
  previous(): void { }
  play(): void { }
  pause(): void { }
  next(): void { }

  playStream(url: any) {
    this.audioService.playStream(url).subscribe((events: any) => {
      // listening for fun here
    });
  }

}
