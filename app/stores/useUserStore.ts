import { defineStore } from "pinia";

type state = {
    _role: any,
    _user: string | null,
    _authorized: boolean,
}

export const useUserStore = defineStore('user', {
    state: ():state => ({
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
        setUser(data: any) {
            this._user = data;
            this._authorized = true;
            this.setRole(data.role);
        }, 
        setRole(role: string | null) {
            this._role = role;
        },
        resetUser() {
            this._user = null;
            this._authorized = false;
            this.setRole(null);
        }
    }
})
