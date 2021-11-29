import { AlertColor } from '@mui/material/Alert';

export interface AlertState {
    message: string
    type: AlertColor | undefined
}

export interface UserState {
    signedIn: boolean
}

export interface RegistrationData<Type> {
    email: Type
    displayName: Type
    password: Type
    confirmPassword: Type
}

export interface PublicUserData {
    displayName: string
}