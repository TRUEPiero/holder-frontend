import { useUserStore } from "~/stores";

export default defineNuxtRouteMiddleware(async(to) => {
    const userStore = useUserStore();

    if(!userStore.isAuthorized) {
        return navigateTo('/login');
    } else {
        return navigateTo( `/project/list`)
    }
})
