import {treaty} from '@elysiajs/eden'

export const api = treaty<any>('localhost:3030', {
    fetch: {
        credentials: 'include',
    }
})
