<template>
    <UCard>
        <template #header>
            <h1>Регистрация</h1>
        </template>
        <UForm
            :state="state"
            :schema="schema"
            @submit="onSubmit"
        >
            <UFormField label="Логин" name="login">
                <UInput v-model="state.login"/>
            </UFormField>
            <UFormField v-if="sent" label="Код" name="code">
                <UInput v-model="codeVerify"/>
            </UFormField>
            <UButton label="Продолжить" type="submit"/>
        </UForm>
    </UCard>
</template>

<script lang="ts" setup>
    import * as z from 'zod'

    const schema = z.object({
        login: z.email('Invalid email'),
    })

    const sent = ref(false)
    const codeVerify = ref(undefined)

    const state = reactive({
        login: undefined
    })

    const onSubmit = () => {
        if(!sent.value) {
            sent.value = true
        } else {
            console.log(codeVerify.value);
        }
    }
</script>
