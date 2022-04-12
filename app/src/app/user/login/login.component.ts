import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    // private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm): void {
    // if (form.invalid) { return; }
    // const { email, password } = form.value;
    // this.userService.login({ email, password }).subscribe({
    //   next: () => {
    //     const redirectUrl = this.activatedRoute.snapshot.queryParams.redirectUrl || '/';
    //     this.router.navigate([redirectUrl]);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // });
  }
}
