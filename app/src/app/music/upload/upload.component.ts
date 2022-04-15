import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/app/core/services/file.service';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

const URL = 'http://localhost:3030/data/catalog';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss', "../../../../node_modules/ngx-toastr/toastr.css"]
})
export class UploadComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'file',
  });

  constructor(private fileService: FileService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    // TODO attempt for implementing some library for uploading files
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.toastr.success('File successfully uploaded!');
    };
  }

  uploadSong(form: NgForm): void {
    if (form.invalid) { return; }
    const { name, artist, file } = form.value;
    console.log(form.value)

    const formData = new FormData();
    console.log(file)
    //append file here 
    // formData.append('file', file, file.name);
    //and append the other fields as an object here
    /* var user = {name: 'name from the form',
        email: 'email from the form' 
        etc...       
    }*/
    formData.append('name', name);
    formData.append('artist', artist);
    this.fileService.uploadFile(form.value).subscribe({
      // TODO make sure uploadFile receives the right format so that the back end can understand it
      next: (val) => {
        const redirectUrl = this.activatedRoute.snapshot.queryParams['redirectUrl'] || '/';
        this.router.navigate([redirectUrl]);
      },
      error: (err) => {
        console.log(err);
      }
    });
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
