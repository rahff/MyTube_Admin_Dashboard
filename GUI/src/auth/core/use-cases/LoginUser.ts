import { BehaviorSubject, Observable, of } from "rxjs";
import { LoginCredentials } from "../ports/dtos/LoginCredentials";
import { LOGIN_FAIL_STATE, LOGIN_INITIAL_STATE, LOGIN_SUCCESS_STATE, LoginState } from "../ports/dtos/LoginState";
import { AuthenticationGateway } from "../ports/driven/AuthenticationGateway";
import { LocalStorage } from "../ports/driven/LocalStorage";
import { Authentication } from "../ports/driver/Authentication";
import { Exception } from "src/shared/Exception";

export class LoginUser {

    private state$ = new BehaviorSubject<LoginState>(LOGIN_INITIAL_STATE);
    private loadingState$ = new BehaviorSubject<boolean>(false);
    
    public constructor(private authenticationGateway: AuthenticationGateway,
                       private localStorage: LocalStorage){}

    public async sendCredentials(credentials: LoginCredentials): Promise<void> {
        try {
            const authentication = await this.getAuthentication(credentials)
            this.onLoginSuccess(authentication);
        } catch (error: any) {
            this.onLoginFailed(error);
        }
    }

    private onLoginSuccess(authentication: Authentication): void {
        this.localStorage.saveObject("authentication", authentication);
        this.state$.next(LOGIN_SUCCESS_STATE);
        this.loadingState$.next(false);
    }

    private async getAuthentication(credentials: LoginCredentials): Promise<Authentication> {
        this.loadingState$.next(true);
        return await this.authenticationGateway.login(credentials);
    }

    private onLoginFailed(error: Exception) {
        this.state$.next(LOGIN_FAIL_STATE(error));
        this.loadingState$.next(false);
    }

    public getState(): Observable<LoginState> {
        return this.state$.asObservable();
    }

    public isLoading(): Observable<boolean> {
        return this.loadingState$.asObservable();
    }
}