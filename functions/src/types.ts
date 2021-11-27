export interface ProductBody {
    name: string
    description: string
    fundingGoal: number
}

export interface ProductId {
    id: string
}

export type Product = ProductId & ProductBody

export interface ReadConfig {
    id?: string
    limit?: number
}

export interface User {
    uid: string
    displayName: string
}
