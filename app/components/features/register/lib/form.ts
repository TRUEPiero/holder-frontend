import * as z from 'zod'

export function useForm(
    query: {
        email: string,
        verify_code: string
    }
) {

    const { t } = useI18n();

    const schema = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string().min(8, t('register.form.validation.pass_min_char')),
        verify_code: z.string()
    });

    type Schema = z.output<typeof schema>;

    const state = reactive<Schema>({
        name: '',
        email: query.email,
        password: '',
        verify_code: query.verify_code
    })

    return {
        schema, 
        state
    }
}