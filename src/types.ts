import { AlertColor } from '@mui/material/Alert';

export interface AlertState {
    message: string
    type: AlertColor | undefined
}
