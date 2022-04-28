import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/app/core/services/file.service';


@Component({
	selector: 'app-upload',
	templateUrl: './upload.component.html',
	styleUrls: [ './upload.component.scss' ]
})
export class UploadComponent implements OnInit {
	file: File | undefined;

	constructor(
		private fileService: FileService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
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
			next: (val) => {
				const redirectUrl = this.activatedRoute.snapshot.queryParams['redirectUrl'] || '/';
				this.router.navigate([ redirectUrl ]);
			},
			error: (err) => {
				console.log(err);
			}
		});
	}
}