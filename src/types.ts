import { AlertColor } from '@mui/material/Alert';

export interface AlertState {
    message: string
    type: AlertColor | undefined
}

export interface RegistrationData<Type> {
    email: Type
    displayName: Type
    password: Type
    confirmPassword: Type
}

export interface ProductData<Type> {
    productUID?: string
    title: Type
    goal: Type
    description: Type
    creatorName?: string
    creatorUID?: string
    currentFunds?: string
}

interface Pledge {
    amount: number
    product: ProductData<string>
}

export interface PublicUserData {
    displayName: string
    pledges?: Pledge[]
    products?: ProductData<string>[]
}

export interface UserState {
    signedIn: boolean | null // Null when still loading
    profile: PublicUserData
}
