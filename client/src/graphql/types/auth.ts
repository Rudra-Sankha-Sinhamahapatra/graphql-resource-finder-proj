export interface User {
    id: string;
    email: string;
    username: string;
}

export interface AuthResponse {
    token: string;
    data: User;
}

export interface SignInVariables {
    email: string;
    password: string;
}

export interface SignUpVariables {
    email: string;
    password: string;
    username: string;
}
