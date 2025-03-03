export type User = {
    email: string,
    handle: string,
    name: string,
    _id: string,
    description: string,
    image: string,
}

export type SignUpForm = Pick<User, 'email' | 'name' | 'handle'> & {
    password: string,
    password_confirmation: string
}

export type SignInForm = Pick<User, 'email'> & {
    password: string,
}

export type ProfileForm = Pick<User, 'handle' | 'description' | 'image'>