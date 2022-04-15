import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/app/core/services/file.service';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

// const URL = '/api/data/catalog';

@Component({
	selector: 'app-upload',
	templateUrl: './upload.component.html',
	styleUrls: [ './upload.component.scss', '../../../../node_modules/ngx-toastr/toastr.css' ]
})
export class UploadComponent implements OnInit {
	// public uploader: FileUploader = new FileUploader({
	//   url: URL,
	//   itemAlias: 'file',
	// });
	file: File | undefined;

	constructor(
		private fileService: FileService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private toastr: ToastrService
	) {}

	ngOnInit(): void {
		// TODO attempt for implementing some library for uploading files
		// this.uploader.onAfterAddingFile = (file) => {
		//   file.withCredentials = false;
		// };
		// this.uploader.onCompleteItem = (item: any, status: any) => {
		//   console.log('Uploaded File Details:', item);
		//   this.toastr.success('File successfully uploaded!');
		// };
	}

	onChange(e: Event) {
		this.file = (e.target as HTMLInputElement).files![0];
		console.log(this.file);
	}

	uploadSong(form: NgForm): void {
		if (form.invalid) {
			return;
		}
		const { name, artist } = form.value;

		const formData = new FormData();
		console.log(this.file);

		formData.append('file', this.file!, this.file!.name);
		formData.append('name', name);
		formData.append('artist', artist);

		this.fileService.uploadFile(formData).subscribe({
			// TODO make sure uploadFile receives the right format so that the back end can understand it
			next: (val) => {
				const redirectUrl = this.activatedRoute.snapshot.queryParams['redirectUrl'] || '/';
				this.router.navigate([ redirectUrl ]);
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