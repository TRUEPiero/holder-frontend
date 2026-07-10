type Project = {
    id: number,
    title: string
    balance: string
}

type ProjectState = {
    id: number | null
    title: string | null
}

type createData = {
    title: string
}

export type { 
    Project, 
    ProjectState,
    createData
}