type UserState = {
    role: any,
    user: User | null,
    authorized: boolean,
}

type RegisterData = {
    name: string
    email: string
    password: string
    verify_code: string
}

type User = {
    id: number
    name: string
    email: string
    avatar: string,
    status: string
    telegram: string | null
    telegramId: string | null

}

export type {
    UserState,
    User,
    RegisterData
}