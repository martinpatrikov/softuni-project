import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/app/core/services/file.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {
  item: any = {};
  constructor(
		private fileService: FileService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {
    
    this.fileService.getItemByID(this.activatedRoute.snapshot.params.id).subscribe((item: any) => { this.item = item; console.log(item) });
    
  }

  ngOnInit(): void {
  }

  editSong(form: NgForm){
    if (form.invalid) {
			return;
		}
		const { name, artist } = form.value;
  }
  onChange(e: any){

  }

}
