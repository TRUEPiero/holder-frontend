import { useUserStore, useProjectStore } from "~/stores";

export default defineNuxtRouteMiddleware(async(to) => {
    const userStore = useUserStore();
    const projectStore = useProjectStore();

    if(!userStore.isAuthorized) {
        await userStore.getCurrentUser();
    }

    if(!userStore.isAuthorized) {
        return navigateTo('/login');
    } else {
        const project = await projectStore.fetchDefaultProject();

        return navigateTo( `/project/${project.id}`)
    }
})
