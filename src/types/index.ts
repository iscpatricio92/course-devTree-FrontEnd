export type User = {
    email: string,
    handle: string,
    name: string,
}

export type SignUpForm = Pick<User, 'email' | 'name' | 'handle'> & {
    password: string,
    password_confirmation: string
}