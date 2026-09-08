import * as z from 'zod'

export function useForm() {
    const { t } = useI18n();

    const schema_step1 = z.object({
        email: z.email(t('register.verify.form.validation.invalid_email')),
    })

    const schema_step2 = z.object({
        email: z.email(t('register.verify.form.validation.invalid_email')),
        verify_code: z.string().nonempty(t('register.verify.form.validation.verify_code'))
    })

    type Schema = z.output<typeof schema_step2>

    const state = reactive<Schema>({
        email: '',
        verify_code: ''
    })

    return {
        schema_step1,
        schema_step2, 
        state
    }
}