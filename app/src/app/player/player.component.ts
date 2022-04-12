import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  files: Array<any> = [
    { name: "First Song", artist: "Inder" },
    { name: "Second Song", artist: "You" }
  ];
  state: any;
  currentFile: any = {};

  isFirstPlaying() {
    return false;
  }
  isLastPlaying() {
    return true;
  }
  constructor() { }

  ngOnInit(): void {
  }

  openFile(a: any, b: any): void{}
  onSliderChangeEnd(a: any): void{}
  previous(): void{}  
  play(): void{}
  pause(): void{}
  next(): void{}

}
