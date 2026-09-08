import type { CashboxState, Cashbox } from "~/components/entities/cashbox/model/types";

export const useCashboxStore = defineStore('cashbox', {
    state: ():CashboxState => ({
        active: null,
        cashboxes: [],
        needUpdate: [],
        needReload: false
    }),

    actions: {
        setActive(data: Cashbox) {
            this.active = data;
        },
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