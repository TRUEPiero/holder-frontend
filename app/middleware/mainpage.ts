import { useUserStore } from "~/stores";

export default defineNuxtRouteMiddleware(async(to) => {
    const userStore = useUserStore();

  if (!userStore.authorized && to.path !== '/login') {
    return navigateTo('/login')
  }

  if (userStore.authorized && to.path === '/login') {
    return navigateTo('/project/list')
  }
})
