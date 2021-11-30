export interface ProductPreview {
    uid: string
    title: string
    goal: number
    creatorName: string
    creatorUID: string
}

export interface ProductBody {
    currentFunds: number
    description: string
}

export type Product = ProductBody & ProductPreview

export interface User {
    uid: string
    displayName: string
}
