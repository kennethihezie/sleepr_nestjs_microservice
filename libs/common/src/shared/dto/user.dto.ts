export interface UserDto {
    _id: string
    email: string
    password: string
    token: {
        accessToken: string
        refreshToken: string
    }
}