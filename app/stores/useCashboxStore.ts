import { defineStore } from "pinia";

type state = {
    _cashboxes: any
}

const useCashboxStore = defineStore('cahsbox', {
    state: ():state => ({
        _cashboxes: null,
    }),

    getters: {
        getCashboxes: (state) => state._cashboxes
    },

    actions: {
        async fetchCashboxes() {

        },

        async createCashbox() {
            this._cashboxes = [
                ...this._cashboxes,
            ]
        }
    }
})
