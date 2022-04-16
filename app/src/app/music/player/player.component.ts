import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { AudioService } from "../../core/services/audio.service";
import { FileService } from '../../core/services/file.service';
import { StreamState } from '../../shared/interfaces/stream-state';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

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
    private fileService: FileService,
    private userService: UserService,
    private router: Router
  ) {
    this.fileService.getFiles().subscribe((files: any) => { this.files = files });
    
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }
  openFile(file: any, index: any) {
    this.currentFile = { index };
    this.fileService.getFileByID(file._id).subscribe((file: any) => { console.log(file); this.currentFile.file = file });
    console.log(this.currentFile);
    this.audioService.stop();
    console.log(file)
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

  addToPlaylist(id: any): void {
    this.userService.addToPlaylist(id).subscribe((res: any) => {
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    });
  }

}
