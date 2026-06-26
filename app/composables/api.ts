import {treaty} from '@elysiajs/eden'
import type {App} from '../../../holder-backend/src'; 

let refreshPromise: Promise<boolean> | null = null

async function refreshToken() {
    if (!refreshPromise) {
        refreshPromise = (async () => {
            const response = await fetch('http://localhost:3000/auth/refresh', {
                method: 'POST',
                credentials: 'include'
            })

            return response.ok
        })()

        refreshPromise.finally(() => {
            refreshPromise = null
        })
    }

    return refreshPromise
}

// export const api = treaty<any>(`localhost:${config.public.backendHost}`, {
export const api = treaty<App>(`localhost:3000`, {
    fetch: {
        credentials: 'include',
    },
    async fetcher(url, options) {
        const router = useRouter();

        let response = await fetch(url, {
            ...options,
            credentials: 'include'
        })

        if (response.status !== 401) return response

        const success = await refreshToken()

        if (!success) {
            router.push('/login')
            return response;
        }

        return fetch(url, {
            ...options,
            credentials: 'include'
        })
    }
})
