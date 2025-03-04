export type User = {
    email: string,
    handle: string,
    name: string,
    _id: string,
    description: string,
    image: string,
    links: string
}
export type UserHandle=Pick<User, 'handle' | 'description' | 'image' | 'links' | 'name'>
export type SignUpForm = Pick<User, 'email' | 'name' | 'handle'> & {
    password: string,
    password_confirmation: string
}

export type SignInForm = Pick<User, 'email'> & {
    password: string,
}

export type ProfileForm = Pick<User, 'handle' | 'description' | 'image'>

export type SocialNetwork = {
    id:number,
    name:string,
    url:string,
    enabled:boolean
}

export type DevTreeLink= Pick<SocialNetwork, 'name' | 'url' | 'enabled'>