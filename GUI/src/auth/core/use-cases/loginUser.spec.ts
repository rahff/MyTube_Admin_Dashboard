import { FakeAuthenticationGateway } from "src/auth/adapters/FakeAuthenticationGateway";
import { AuthenticationGateway } from "../ports/driven/AuthenticationGateway";
import { LoginState } from "../ports/dtos/LoginState";
import { LoginUser } from "./LoginUser";
import { BadCredentialsException } from "src/auth/exceptions/BadCredentialsException";
import { LocalStorage } from "../ports/driven/LocalStorage";
import { fakeAsync, flush, tick } from "@angular/core/testing";


describe("LoginUser: Core use-case", () => {
      let loginUser: LoginUser;
      let authGateway: AuthenticationGateway;
      let localStorageService: jasmine.SpyObj<LocalStorage>
      const loginComplete = () => { tick(1000); flush(); }

      beforeEach(() => {
         localStorageService = jasmine.createSpyObj("LocalStorage", ["saveObject"]);
         authGateway = new FakeAuthenticationGateway();
         loginUser = new LoginUser(authGateway, localStorageService);
      })

    it("A user send it's credentials to get Authentication", fakeAsync(() => {
         loginUser.sendCredentials({email: "rahff@gmail.com", password: "12345"});
         loginComplete();
         loginUser.getState().subscribe((loginState: LoginState) => {
            expect(loginState.successLogin).toBeTrue();
            expect(loginState.error).toBeNull();
         })
         
    }));

    it("Success authentication should be persisted at local storage", fakeAsync(() => {
         loginUser.sendCredentials({email: "rahff@gmail.com", password: "12345"});
         loginComplete();
         expect(localStorageService.saveObject).toHaveBeenCalledWith("authentication", FakeAuthenticationGateway.authentication)
         
    }));

    it("A user send it's credentials to get Authentication but it fail due to bad credentials", fakeAsync(() => {
         loginUser.sendCredentials({email: "rahff@gmail.com", password: "wrong password"});
         loginComplete();
         loginUser.getState().subscribe((loginState: LoginState) => {
            expect(loginState.successLogin).toBeFalse();
            expect(loginState.error).toBeInstanceOf(BadCredentialsException);
         })
    }))

    it("should be in loading state while processing", fakeAsync(()=> {
         let isLoading = false;
         loginUser.sendCredentials({email: "rahff@gmail.com", password: "wrong password"});
         tick(100);
         loginUser.isLoading().subscribe((loading: boolean)=> {
            isLoading = loading;
         })
         expect(isLoading).toBeTrue();
         loginComplete();
         loginUser.isLoading().subscribe((loading: boolean)=> {
            isLoading = loading;
         })
         expect(isLoading).toBeFalse();
    }))
})