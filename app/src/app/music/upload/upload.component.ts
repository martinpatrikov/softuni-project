import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FileService } from 'src/app/core/services/file.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(private fileService: FileService, private router: Router) { }

  ngOnInit(): void {
  }

  uploadSong(form: NgForm): void {
    if (form.invalid) { return; }
    // this.fileService.saveTheme(form.value).subscribe({
    //   next: () => {
    //     this.router.navigate(['/themes']);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })
  }
}
