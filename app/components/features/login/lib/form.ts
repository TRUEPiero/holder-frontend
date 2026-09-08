import * as z from 'zod'

export function useForm() {
    
    const { t } = useI18n();

    const schema = z.object({
        login: z.email(t('auth.form.validation.invalid_email')),
        password: z.string(t('auth.form.validation.pass_required')).min(8, t('auth.form.validation.pass_min_char')),
        remember: z.boolean()
    })

    type Schema = z.output<typeof schema>

    const state = reactive<Schema>({
        login: '',
        password: '',
        remember: false,
    })

    return {
        schema,
        state
    }
}