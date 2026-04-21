import {treaty} from '@elysiajs/eden'
import type {App} from '../../../holder-backend/src'; 

// export const api = treaty<any>(`localhost:${config.public.backendHost}`, {
export const api = treaty<App>('localhost:3080', {
    fetch: {
        credentials: 'include',
    }
})
