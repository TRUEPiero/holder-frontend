<template>
    <UForm
        class="AuthForm"
        :state="state"
        :schema="schema"
        @submit="submit"
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
            <Button :label="t('auth.form.to_register')" variant="link" @click="toRegister"/>
        </div>
    </UForm>
</template>

<script lang="ts" setup>
    import Button from '~/components/shared/ui/button/index.vue'
    import Input from '~/components/shared/ui/input/index.vue'
    import InputPassword from '~/components/shared/ui/input/password/index.vue'

    import { AuthByEmail } from '~/components/entities/user/api/Login';
    import { useForm } from '../lib/form';
import { authorize } from '~/components/entities/user/lib/authorize';

    const userStore = useUserStore();
    const router = useRouter();
    const { t } = useI18n();

    const { schema, state } = useForm();

    const loading = ref(false)

    const toRegister = () => {
        router.push('/register/verify')
    }

    const forgotPass = () => {

    }

    const submit = async () => {
        loading.value = true;
        const res = await AuthByEmail(
            state.login,
            state.password
        );
        if(!res) return

        const authorized = await authorize();
        if(!authorized) return;
        
        loading.value = false;
        router.push('/project/list')
    }
</script>

<style src="~/assets/css/components/feature/login/auth.scss"></style>

