import { defineStore } from "pinia";
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

        setRole(role: any) {
            this.role = role
        },

        setUser(user: any) {
            this.user = user
        }
    }


})
