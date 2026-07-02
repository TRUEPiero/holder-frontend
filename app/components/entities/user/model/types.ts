type UserState = {
    role: any,
    user: User | null,
    authorized: boolean,
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
    User
}