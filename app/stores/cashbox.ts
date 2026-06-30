import type { CashboxState, Cashbox } from "~/components/entities/cashbox/model/types";

export const useCashboxStore = defineStore('cashbox', {
    state: ():CashboxState => ({
        cashboxes: [],
        needUpdate: [],
        needReload: false
    }),

    actions: {
        setCashboxes(data: Cashbox[]) {
            this.cashboxes = data;
        },
    
        setNeedUpdate(data: number[]) {
            this.needUpdate = data;
        },

        setNeedReload(value: boolean) {
            this.needReload = value;
        }
    }
})