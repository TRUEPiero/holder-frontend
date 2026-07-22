import * as z from 'zod'

export function useForm() {
    const { t } = useI18n();

    const schema = z.object({
        title: z.string().nonempty(t('project.update.form.validation.title_required')),
    })

    type Schema = z.output<typeof schema>
    
    const state = reactive<Schema>({
        title: '',
    })

    const resetForm = () => {
        state.title = ''
    }
    
    return {
        schema,
        state,
        resetForm
    }
}