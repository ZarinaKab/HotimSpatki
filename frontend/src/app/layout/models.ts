export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    is_premium: boolean;
}

export interface AuthToken {
    token: string;
}
