import * as z from 'zod'

export function useForm() {

    const schema = z.object({
        amount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Некорректная сумма').nonempty(),
        description: z.string(),
    })

    type Schema = z.output<typeof schema>

    const state = reactive<Schema>({
        amount: '',
        description: '',
    })

    const resetForm = () => {
        state.amount = '',
        state.description = ''
    }
    
    return {
        state,
        schema,
        resetForm
    }
}