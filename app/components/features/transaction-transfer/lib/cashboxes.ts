import type { Cashbox, ExternalCashbox } from "~/components/entities/cashbox/model/types";
import type { TransferType } from "~/components/entities/transaction/model/types";

export function useCashboxes(cashboxes: Cashbox[], cashboxId: number) {
    const { t } = useI18n();

    const fromId = ref<number>(0);
    const toId = ref<number>(0);

    const all = computed<(Cashbox | ExternalCashbox)[]>(() => {
        return [
            { id: 0, title: t('transaction.transfer.form.external_cashbox') },
            ...cashboxes
        ]
    })

    const fromItems = computed(() => all.value.filter((i) => i.id !== toId.value))
    const fromIndex = computed(() => fromItems.value.findIndex(i => i.id === fromId.value))

    const toItems = computed(() => all.value.filter((i) => i.id !== fromId.value))
    const toIndex = computed(() => toItems.value.findIndex(i => i.id === toId.value))

    const setActiveIds = (mode: TransferType) => {
        fromId.value = mode === 'expense' ? cashboxId : 0;
        toId.value = mode === 'income' ? cashboxId : 0;
    }

    const setFromId = (index: number) => fromId.value = fromItems.value[index]!.id
    const setToId = (index: number) => toId.value = toItems.value[index]!.id

    return {
        fromId,
        toId,
        fromItems,
        toItems,
        fromIndex,
        toIndex,
        setActiveIds,
        setFromId,
        setToId
    } 
}