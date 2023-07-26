import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LoginCredentials } from 'src/auth/core/ports/dtos/LoginCredentials';
import { LoginState } from 'src/auth/core/ports/dtos/LoginState';
import { LoginUser } from 'src/auth/core/use-cases/LoginUser';
import { InvalidFormException } from 'src/auth/exceptions/InvalidFormException';
import { Exception } from 'src/shared/Exception';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private loginForm!: FormGroup;
  private loginError: Exception | null = null;
  private subscription = new Subscription();
  private isLoading$: Observable<boolean> = new Observable();
  public constructor(private loginService: LoginUser, 
                     private formBuilder: FormBuilder,
                     private router: Router){}

  public ngOnInit(): void {
    this.initForm();
    this.addLoginStateListener();
  }

  private addLoginStateListener(): void {
    this.subscription.add(this.loginService.getState()
    .subscribe({next: this.onStateChange.bind(this)}));
    this.isLoading$ = this.loginService.isLoading();
  }

  private onStateChange(loginState: LoginState): void {
    if(loginState.successLogin) 
      this.router.navigateByUrl("/home");
    this.loginError = loginState.error;
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  public getForm(): FormGroup {
    return this.loginForm;
  }

  public getErrorMessage(): string | undefined {
    return this.loginError?.message;
  }

  public isLoading(): Observable<boolean> {
    return this.isLoading$
  }

  public submit(): void {
    if(this.loginForm.valid){
      const values = this.loginForm.getRawValue();
      this.loginService.sendCredentials(values as LoginCredentials);
    }else {
      this.loginError = new InvalidFormException("invalid form");
    }
  }
  public ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}

