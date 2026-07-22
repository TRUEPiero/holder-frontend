import { authorize } from "~/components/entities/user/lib/authorize";

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.client) {
    const authorized = await authorize();
    const publicPaths = ['/login', '/register']

    if (!authorized && !publicPaths.includes(to.path)) {
      return navigateTo('/login')
    }

    if (authorized && publicPaths.includes(to.path)) {
      return navigateTo('/project/list')
    }
  }
})
