import type { Cashbox } from "~/components/entities/cashbox/model/types";

export function useEdit(
    cashbox: Ref<Cashbox | undefined>
) {

    const edit = ref(false);

    const editData = reactive({
        title: '',
        description: ''
    })

    const isChanged = computed(() => {
        if (!cashbox.value) return false

        return (
            editData.title !== cashbox.value.title ||
            editData.description !== cashbox.value.description
        )
    })

    const startEdit = () => {
        if (!cashbox.value) return

        editData.title = cashbox.value.title
        editData.description = cashbox.value.description

        edit.value = true
    }

    const stopEdit = () => {
        edit.value = false
    }

    return {
        edit,
        editData,
        isChanged,
        startEdit,
        stopEdit,
    }
}