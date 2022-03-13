import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/service/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public form!: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string = '';
  public error = '';
  public passwordTextType: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private messageService: MessageService
  ) {
    // redirect to home if already logged in
    if (this._authenticationService.sessionUserValue) {
      this._router.navigate(['/']);
    }
  }

  get f() {
    return this.form.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    // Login
    this.loading = true;
    this._authenticationService
      .signUp(
        this.f['email'].value,
        this.f['firstname'].value,
        this.f['surname'].value,
        this.f['password'].value
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this._router.navigate([this.returnUrl]);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Errore!',
            detail: 'Email già presente!',
          });
          this.error = error;
          this.loading = false;
        }
      );
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      firstname: [null, Validators.required],
      surname: [null, Validators.required],
      password: [null, Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }
}
