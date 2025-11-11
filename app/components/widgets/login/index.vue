<template>
    <UCard>
        <template #header>
            <h2 class="text-center">Авторизация</h2>
        </template>
        <UForm
            :state="state"
            :schema="schema"
            @submit="onSubmit"
        >
            <UFormField label="Логин" name="login">
                <Input v-model="state.login" type="text"/>
            </UFormField>
            <UFormField label="Пароль" name="password">
                <InputPassword v-model="state.password"/>
            </UFormField>
            <div class="flex flex-row w-full">
                <UFormField label="Запомнить меня" name="remember">
                    <UCheckbox v-model="remember"/>
                </UFormField>
                <Button :label="'Забыли пароль'" :variant="'link'" @click="forgotPass"/>
            </div>
            <Button :label="'Войти'" :type="'submit'"/>
        </UForm>
    </UCard>
</template>

<script lang="ts" setup>
    import * as z from 'zod'
    import InputPassword from '~/components/shared/input/password/index.vue'
    import Input from '~/components/shared/input/index.vue'
    import Button from '~/components/shared/button/index.vue'
    import { useUserStore } from '~/stores';

    const userStore = useUserStore();
    const router = useRouter();

    const schema = z.object({
        login: z.email('Invalid email'),
        password: z.string('Password is required').min(8, 'Must be at least 8 characters')
    })

    const remember = ref(false)
    const loading = ref(false)

    const state = reactive({
        login: '',
        password: '',
    })

    const forgotPass = () => {

    }

    const onSubmit = async () => {
        loading.value = true;
        await userStore.auth({
            ...state,
            remember: remember.value
        });

        loading.value = false;

        router.push('/')
    }
</script>
