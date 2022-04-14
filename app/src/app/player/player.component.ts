import { Component, OnInit } from '@angular/core';
import { AudioService } from "../core/services/audio.service";
import { StreamState } from '../shared/interfaces/stream-state';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  filesI: Array<any> = [];
  state: StreamState | undefined;
  currentFile: any = {};

  files: Array<any> = [
    { name: "First Song", artist: "Inder" },
    { name: "Second Song", artist: "You" }
  ];

  isFirstPlaying() {
    return false;
  }
  isLastPlaying() {
    return true;
  }
  constructor(public audioService: AudioService) { }

  ngOnInit(): void {
  }

  openFile(a: any, b: any): void{}
  onSliderChangeEnd(a: any): void{}
  previous(): void{}  
  play(): void{}
  pause(): void{}
  next(): void{}

}
