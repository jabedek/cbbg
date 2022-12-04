import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {
  BackendError,
  BackendMessage,
} from '../../../../../../system-shared/models/backend-message';

@Component({
  selector: 'app-login-register-form',
  templateUrl: './login-register-form.component.html',
  styleUrls: ['./login-register-form.component.scss'],
})
export class LoginRegisterFormComponent implements AfterViewInit {
  @ViewChild('usernameInput') usernameInput: ElementRef | undefined;

  formMode: 'register' | 'login' = 'register';
  form: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z]{4,10}')]],
    password: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(10)],
    ],
  });
  registrationResult: '' | 'success' | 'failure' = '';
  resultMessage = '';
  isLoading$ = this.auth.isLoading$;

  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    if (e.ctrlKey && e.shiftKey) {
      this.changeMode();
    }
  }

  constructor(
    public fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.usernameInput?.nativeElement.focus();
  }

  handleSubmit(): void {
    this.formMode === 'login' ? this.signin() : this.signup();
  }

  changeMode(targetMode?: 'register' | 'login') {
    if (targetMode) {
      this.formMode = targetMode;
    } else {
      this.formMode = this.formMode === 'register' ? 'login' : 'register';
    }

    this.form.reset();
    this.registrationResult = '';
    this.resultMessage = '';
    this.auth.isLoading$.next(false);
  }

  private signin(): void {
    this.auth.signin(this.form.value).subscribe({
      next: (result: BackendMessage) => {
        this.registrationResult = result.status;
        this.resultMessage = '';
        // redirect;
        this.router.navigate(['account']);
        console.log('redirect');
      },
      error: (err: BackendError) => {
        this.registrationResult = err.error.status;
        const errMessage = err.error.message;

        this.resultMessage = `🍄 ${
          typeof errMessage === 'string'
            ? errMessage
            : ' Wystąpił błąd. Spróbuj ponownie.'
        }`;
      },
    });
  }

  private signup(): void {
    this.auth.signup(this.form.value).subscribe({
      next: (result: BackendMessage) => {
        this.registrationResult = result.status;
        this.resultMessage =
          '🍀 Rejestracja powiodła się. Możesz się zalogować.';
        this.form.reset();
      },
      error: (err: BackendError) => {
        this.registrationResult = err.error.status;
        const errMessage = err.error.message;

        this.resultMessage = `🍄 ${
          typeof errMessage === 'string'
            ? errMessage
            : ' Wystąpił błąd. Spróbuj ponownie.'
        }`;
      },
    });
  }
}
