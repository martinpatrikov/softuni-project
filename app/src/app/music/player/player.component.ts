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

  url: string = 'http://localhost:3000/data/catalog/play';

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  files: Array<any> = [];
  state: StreamState | undefined;
  currentFile: any = {};

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
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
  openFile(file: any, index: number) {
    this.fileService.getFileByID(file._doc._id).subscribe(e => {
      const newFile = { ...e, url: this.url };
      console.log(newFile)
      this.currentFile = { index, newFile };
      this.audioService.stop();
      this.playStream(file.url);
    })

  }
  onSliderChangeEnd(change: any) {
    this.audioService.seekTo(change.value);
  }
  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }
  play() {
    this.audioService.play();
  }
  pause() {
    this.audioService.pause();
  }
  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }
  stop() {
    this.audioService.stop();
  }

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
