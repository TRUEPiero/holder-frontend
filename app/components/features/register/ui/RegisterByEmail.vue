<template>
    <UForm :schema="schema" :state="state" @submit="submit">
        <UFormField class="RegisterForm__field" :label="t('register.form.name')" name="name">
            <Input v-model="state.name" type="text" :placeholder="t('register.form.enter_name')"/>
        </UFormField>
        <UFormField class="RegisterForm__field" :label="t('register.form.email')" name="email">
            <Input v-model="state.email" type="text" :placeholder="t('register.form.enter_email')" disabled/>
        </UFormField>

        <UFormField class="RegisterForm__field" :label="t('register.form.password')" name="password">
            <InputPassword v-model="state.password" type="text" :placeholder="t('register.form.enter_password')"/>
        </UFormField>
        <UFormField class="RegisterForm__field" :label="t('register.form.password_verify')" name="password_verify">
            <InputPassword v-model="password_verify" type="text" :placeholder="t('register.form.enter_password_verify')" @update:model-value="(value: any) => console.log(value)"/>
        </UFormField>
        <div class="RegisterForm__footer">
            <Button :label="t('register.form.submit')" :disabled="!valid" type="submit"/>
        </div>
    </UForm>
</template>

<script setup lang="ts">
import Input from '~/components/shared/ui/input/index.vue'
import Button from '~/components/shared/ui/button/index.vue'
import InputPassword from '~/components/shared/ui/input/password/index.vue'; 

import { register } from '~/components/entities/user/api/register';
import { useForm } from '../lib/form';
import { authorize } from '~/components/entities/user/lib/authorize';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { schema, state } = useForm(route.query as any);

const loading = ref(false);
const password_verify = ref('');

const valid = computed(() => password_verify.value === state.password);

const submit = async () => {
    loading.value = true;

    const res = await register(state);
    if(!res) return;

    const authorized = await authorize();
    if(!authorized) return;
    
    router.push('/project/list')

    loading.value = false;
}
</script>

<style src="~/assets/css/components/feature/register/register.scss"> </style>