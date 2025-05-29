export interface SignupArgs {
    email: string;
    password: string;
    username:string;
}

export interface SigninArgs {
    email: string;
    password: string;
}

export interface UserArgs {
    username: string;
}

export interface ResourceByIdArgs {
    id: string;
}

export interface CreateResourceArgs {
    name: string;
    description: string;
    link: string;
    imageUrl: string;
}

export interface UpdateResourceArgs {
    id: string;
    name: string;
    description: string;
    link: string;
    imageUrl: string;
}