import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import {
  BackendError,
  BackendMessage,
} from '../../../../../../system-shared/models/backend-message';
import { UserData } from '../../../../../../system-shared/models/user.model';

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
  ) {
    setTimeout(() => {
      this.auth.checkIfLoggedInLocalStorage();
    }, 0);
  }

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

    this.usernameInput?.nativeElement.focus();
  }

  private signin(): void {
    this.auth.signin(this.form.value).subscribe({
      next: (_: UserData) => {
        this.registrationResult = '';
        this.resultMessage = '';
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
