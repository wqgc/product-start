export interface ProductPreview {
    productUID: string
    title: string
    goal: string
    creatorName: string
    creatorUID: string
}

export interface ProductBody {
    currentFunds: string
    description: string
}

export type Product = ProductBody & ProductPreview

export interface AggregateProducts {
    products: ProductPreview[]
}

interface Pledge {
    amount: string
    product: ProductPreview
}

export interface User {
    uid: string
    displayName: string
    pledges: Pledge[]
    products: ProductPreview[]
}
