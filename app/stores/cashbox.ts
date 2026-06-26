import { defineStore } from "pinia";
import type { CashboxState, Cashbox } from "~/components/entities/cashbox/model/types";

export const useCashboxStore = defineStore('cashbox', {
    state: ():CashboxState => ({
        cashboxes: [],
        actived: null
    }),

    actions: {
        setCashboxes(data: any) {
            this.cashboxes = data;
        },

        setActives(data: any) {
            this.actived = data;
        }
    }
})