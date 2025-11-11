import { useUserStore } from "~/stores";

export default defineNuxtRouteMiddleware(async (to) => {
    const userStore = useUserStore();

    if(!userStore.getUser) {
        await userStore.getCurrentUser();
    }

    const protectedRoutes   = ['/project'];
    const guestRoutes       = ['/login', '/register'];

    const isProtected = protectedRoutes.some(route => to.path.startsWith(route))
    const isGuest = guestRoutes.some(route => to.path.startsWith(route))

    if(isProtected && !userStore.getUser) {
        return navigateTo('/login');
    }

    if(isGuest && userStore.getUser) {
        return navigateTo('/')
    }
})
