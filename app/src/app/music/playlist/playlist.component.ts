import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from 'src/app/core/services/audio.service';
import { FileService } from 'src/app/core/services/file.service';
import { UserService } from 'src/app/core/services/user.service';
import { StreamState } from 'src/app/shared/interfaces/stream-state';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
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
    this.fileService.getFilesInPlaylist().subscribe((files: any) => { this.files = files });
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }
  ngOnInit(): void {
    
  }

  openFile(file: any, index: number) {
    this.currentFile = { ...file, index };
    const newFile = `http://localhost:3030/data/catalog/${file._id}`;
    this.playStream(newFile);
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
