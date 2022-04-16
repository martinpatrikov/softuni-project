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
    this.fileService.getFilesInPlaylist().subscribe((files: any) => { this.files = files });
  }
  ngOnInit(): void {
    
  }


  openFile(file: any, index: any) {
    this.currentFile = { index };
    this.fileService.getFileByID(file._id).subscribe((file: any) => { console.log(file); this.currentFile.file = file });
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

  addToPlaylist(id: any): void {
    this.userService.addToPlaylist(id).subscribe((res: any) => {
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    });
  }
}
