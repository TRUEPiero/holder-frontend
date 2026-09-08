import type { UserState } from "~/components/entities/user/model/types";

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        role: null,
        user: null,
        authorized: false,

    }),

    actions: {
        authorize(data: any) {
            const { role, ...user } = data;

            this.setRole(role)
            this.setUser(user)
            this.authorized = true
        },

        unauthorize() {
            this.setRole(null)
            this.setUser(null)
            this.authorized = false
        },

        setRole(role: any) {
            this.role = role
        },

        setUser(user: any) {
            this.user = user
        },

        initials() {
            const parts = this.user?.name.split(' ') || [];
            if(!parts.length) return ``;

            return `${parts[0]?.[0] || ''}${parts[1]?.[0] || ''}`.toUpperCase()
        }
    }


})
