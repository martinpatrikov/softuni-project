import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/app/core/services/file.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(
		private fileService: FileService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}

  ngOnInit(): void {
  }

  uploadSong(form: NgForm){

  }
  onChange(e: any){

  }
}
