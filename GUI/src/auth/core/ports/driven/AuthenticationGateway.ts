import { Authentication } from "../driver/Authentication";
import { LoginCredentials } from "../dtos/LoginCredentials";

export interface AuthenticationGateway {
    login(credentials: LoginCredentials): Promise<Authentication>
}