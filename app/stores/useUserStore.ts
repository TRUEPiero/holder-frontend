import { defineStore } from "pinia";

type AythFormData = {
    login: string,
    password: string,
    remember: boolean
}

export const useUserStore = defineStore('user', {
    state: () => ({
        _role: null,
        _user: null,
        _authorized: false,

    }),
    getters: {
        getUser: (state) => state._user,
        getRole: (state) => state._role,
        isAuthorized: (state) => state._authorized
    },

    actions: {
        async getCurrentUser(): Promise<void> {
            const { data, error } = await api.user.get();

            if (!error) {
                this._user = data;
                this._role = data.role;
                this._authorized = true
            }
        },

        async auth(body: AythFormData): Promise<any> {

            const { data, error } = await api.auth.login.post({ ...body })

            if (error) {
                return false
            }

            this._user = data;
            this._role = data.role;
            this._authorized = true

            return true
        },

        async logout():Promise<void> {

            const {data, error} = await api.auth.logout.post();

            if(error) {
                return
            }

            this._authorized = false;
            this._user = null;
            this._role = null;
        }
    }
})
