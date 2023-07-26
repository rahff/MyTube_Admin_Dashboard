import { AuthenticationGateway } from "../core/ports/driven/AuthenticationGateway";
import { Authentication } from "../core/ports/driver/Authentication";
import { LoginCredentials } from "../core/ports/dtos/LoginCredentials";
import { BadCredentialsException } from "../exceptions/BadCredentialsException";

export class FakeAuthenticationGateway implements AuthenticationGateway {

    public static authentication: Authentication;

    public constructor() {
        FakeAuthenticationGateway.authentication = {
            user: {
                username: "rahff",
                email: "rahff@gmail;com",
                picture: "http://localhost:4200/assets/picture.png"
            },
            accessToken: "000000000000000000000000000000000000000000000000000000000000000000000000"
        }
    }

    public async login(credentials: LoginCredentials): Promise<Authentication> {
        return new Promise((complete, reject) => {
            if(credentials.password === "wrong password"){
                setTimeout(() => {
                    reject(new BadCredentialsException("bad credentials"))
                }, 1000);
            }
            setTimeout(() => {
                complete(FakeAuthenticationGateway.authentication);
            }, 1000);
        })
    }

}