import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LoginUser } from 'src/auth/core/use-cases/LoginUser';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { BadCredentialsException } from 'src/auth/exceptions/BadCredentialsException';
import { LOGIN_FAIL_STATE, LOGIN_INITIAL_STATE, LOGIN_SUCCESS_STATE } from 'src/auth/core/ports/dtos/LoginState';

describe('LoginComponent: A Login form that ', () => {
  let component: LoginComponent;
  let loginUser: jasmine.SpyObj<LoginUser>;
  let router: jasmine.SpyObj<Router>
  const validCredentials = {email:"validemail@gmail.com", password: "validPassword"};

  beforeEach(() => {
    router = jasmine.createSpyObj("Router", ["navigateByUrl"]);
    loginUser = jasmine.createSpyObj("LoginUser", ["sendCredentials", "getState", "isLoading"]);
    component = new LoginComponent(loginUser, new FormBuilder(), router);
    loginUser.getState.and.returnValue(of(LOGIN_INITIAL_STATE));
    component.ngOnInit();
  });

  it('send credentials to get authentication', () => {
    const form = component.getForm();
    form.get("email")?.setValue(validCredentials.email);
    form.get("password")?.setValue(validCredentials.password);
    component.submit();
    expect(loginUser.sendCredentials).toHaveBeenCalledWith(validCredentials)
  });

  it('Cannot send credentials to get authentication if the form is not properly fullfield', () => {
    const form = component.getForm();
    form.get("email")?.setValue("validemail@gmail.com");
    component.submit();
    expect(loginUser.sendCredentials).not.toHaveBeenCalled()
  });

  it('Error message is displayed when user attemp to submit an invalid form', () => {
    const form = component.getForm();
    form.get("email")?.setValue("validemail@gmail.com");
    component.submit();
    expect(component.getErrorMessage()).toBe("invalid form");
  });

  it('User should be redirected when authentication succeed', () => {
    loginUser.getState.and.returnValue(of(LOGIN_SUCCESS_STATE));
    component.ngOnInit()
    expect(router.navigateByUrl).toHaveBeenCalledWith("/home")
  });

  it('User should see the error message if the authentication fail', () => {
    const error = new BadCredentialsException("Bad credentials");
    loginUser.getState.and.returnValue(of(LOGIN_FAIL_STATE(error)));
    component.ngOnInit();
    expect(router.navigateByUrl).not.toHaveBeenCalledWith("/home");
    expect(component.getErrorMessage()).toEqual(error.message);
  });
});
