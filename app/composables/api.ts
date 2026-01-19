import {treaty} from '@elysiajs/eden'

export const api = treaty<any>('localhost:3025', {
    fetch: {
        credentials: 'include',
    }
})
