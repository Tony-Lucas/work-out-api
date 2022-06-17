
export interface IUser{
    id: number,
    name: string,
    email: string,
    password: string,
    createdAt: string,
    updatedAt: string,
    imgName: string,
    imgUrl: string
}

export interface ITask{
    id: number,
    description: string,
    priority: "Baixa" | "Média" | "Alta",
    status: "To Do" | "Doing" | "Done" | "Review",
    createdAt: string,
    updatedAt: string,
    userId: number
}

export interface IProject{
    id: number,
    name: string,
    adm_id: number,
    createdAt: string,
    updatedAt: string
}

export interface IProjectTasks{
    id: number,
    description: string,
    priority: "Baixa" | "Média" | "Alta",
    status: "To Do" | "Doing" | "Done" | "Review",
    createdBy: number,
    lastUpdateBy: number,
    createdAt: string,
    updatedAt: string,
    projectId: number
}

export interface IUserProjects{
    id: number,
    userId: number,
    projectId: number,
    createdAt: string,
    updatedAt: string
}