import { Exception } from "src/shared/Exception"

export type LoginState = {
    successLogin: boolean,
    error: Exception | null
}

export const LOGIN_INITIAL_STATE: LoginState = {
    error: null,
    successLogin: false
}

export const LOGIN_SUCCESS_STATE: LoginState = {
    error: null,
    successLogin: true
}

export const LOGIN_FAIL_STATE = (error: Exception): LoginState => ({error, successLogin: false})