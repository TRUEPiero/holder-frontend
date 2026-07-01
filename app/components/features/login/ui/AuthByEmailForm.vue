<template>
    <UForm
        class="AuthForm"
        :state="state"
        :schema="schema"
        @submit="onSubmit"
    >
        <UFormField class="AuthForm__field" :label="t('auth.form.login')" name="login">
            <Input v-model="state.login" type="text" :placeholder="t('auth.form.enter_login')"/>
        </UFormField>
        <UFormField class="AuthForm__field" :label="t('auth.form.password')" name="password">
            <InputPassword v-model="state.password" :placeholder="t('auth.form.enter_pass')"/>
        </UFormField>
        <div class="AuthForm__actions">
            <UFormField class="forgotPass" :label="t('auth.form.remember_me')" name="remember" orientation="horizontal">
                <UCheckbox v-model="state.remember"/>
            </UFormField>
            <Button :label="t('auth.form.forgot_pass')" :variant="'link'" @click="forgotPass"/>
        </div>
        <div class="AuthForm__footer">
            <Button :label="t('auth.form.submit')" :type="'submit'"/>
        </div>
    </UForm>
</template>

<script lang="ts" setup>
    import * as z from 'zod'
    import Button from '~/components/shared/ui/button/index.vue'
    import Input from '~/components/shared/ui/input/index.vue'
    import InputPassword from '~/components/shared/ui/input/password/index.vue'
    import { AuthByEmail } from '~/components/entities/user/api/Login';
    import { useUserStore } from '~/stores';

    const userStore = useUserStore();
    const router = useRouter();
    const { t } = useI18n();

    const schema = z.object({
        login: z.email(t('auth.form.validation.invalid_email')),
        password: z.string(t('auth.form.validation.pass_required')).min(8, t('auth.form.validation.pass_min_char'))
    })

    const loading = ref(false)

    const state = reactive({
        login: '',
        password: '',
        remember: false,
    })

    const forgotPass = () => {

    }

    const onSubmit = async () => {
        loading.value = true;
        const res = await AuthByEmail(
            state.login,
            state.password
        );
        if(!res) return

        userStore.authorize(res.data);
        loading.value = false;
        router.push('/project/list')
    }
</script>

<style src="~/assets/css/components/feature/login/auth.scss"></style>

