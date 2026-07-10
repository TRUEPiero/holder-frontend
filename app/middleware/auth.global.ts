import { authorize } from "~/components/entities/user/lib/authorize";

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.client) {
    const authorized = await authorize();
    console.log(authorized)
    if (!authorized) {
      return navigateTo('/login')
    }

    if (authorized && to.path === '/login') {
      return navigateTo('/project/list')
    }
  }
})
