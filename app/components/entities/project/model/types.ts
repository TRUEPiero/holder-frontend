type Project = {
    id: number,
    title: string
    balance: string
}

type ProjectState = {
    id: number | null
    title: string | null
}

export type { 
    Project, 
    ProjectState
}