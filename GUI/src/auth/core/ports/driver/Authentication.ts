export type Authentication = {
    user: User,
    accessToken: string
}

export type User = {
    username: string,
    email: string,
    picture: string
}