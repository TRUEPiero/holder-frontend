import * as z from 'zod'

export function useForm() {

    const schema = z.object({
        title: z.string().nonempty('Обязательное поле'),
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