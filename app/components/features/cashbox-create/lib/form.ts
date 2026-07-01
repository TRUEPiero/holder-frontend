import * as z from 'zod'

export function useForm() {
    const {t} = useI18n();

    const schema = z.object({
        title: z.string().nonempty(t('cashbox.create.form.validation.title_required')),
        description: z.string()
    })

    type Schema = z.output<typeof schema>

    const state = reactive<Schema>({
        title: '',
        description: ''
    })

    const resetForm = () => {
        state.title = '',
            state.description = ''
    }

    return {
        state,
        schema,
        resetForm
    }
}