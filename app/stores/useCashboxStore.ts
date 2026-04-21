import { defineStore } from "pinia";

export const useCashboxStore = defineStore('cahsbox', {
    state: ()=> ({
        _cashboxes: [],
        _currentCashbox: null
    }),

    getters: {
        getAll: (state) => state._cashboxes,
        getCurrent: (state) => state._currentCashbox
    },

    actions: {
        
    }
})
