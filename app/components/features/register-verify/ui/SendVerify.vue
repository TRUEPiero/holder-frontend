<template>
    <UForm
        class="RegisterForm"
        :state=state
        :schema="sended ? schema_step2 : schema_step1"
        @submit="submit"
    >
        <UFormField class="RegisterForm__field" :label="t('register.verify.form.email')" name="email">
            <Input v-model="state.email" type="text" :placeholder="t('register.verify.form.enter_email')"/>
        </UFormField>

        <UFormField v-if="sended" class="RegisterForm__field" :label="t('register.verify.form.verify_code')" name="code">
            <Input v-model="state.verify_code" type="text" :placeholder="t('register.verify.form.enter_code')"/>
        </UFormField>

        <div class="RegisterForm__footer">
            <Button :label="t('register.verify.form.submit')" :type="'submit'"/>
        </div>
    </UForm>
</template>

<script setup lang="ts">
import Input from '~/components/shared/ui/input/index.vue'
import Button from '~/components/shared/ui/button/index.vue'
import { sendVerify } from '~/components/entities/user/api/sendVerify';
import { checkVerify } from '~/components/entities/user/api/checkVerify';
import { useForm } from '../lib/form';

const { t } = useI18n();
const router = useRouter();

const loading = ref(false);
const sended = ref(false);

const { state, schema_step1, schema_step2} = useForm();


const submit = async () => {
    loading.value = true;

    if(sended.value) {
        const res = await checkVerify(state.email, state.verify_code)
        if(!res) return;

        const data = res.data;
        router.push(`/register?email=${data.email}&verify_code=${data.verifyToken}`)
    } else {
        const res = await sendVerify(state.email);
        if(!res) return;
        if(res.status && res.value.code !== `INVITE_ALREADY_EXIST`) return;

        sended.value = true;
    }

    loading.value = false;
}


</script>

<style src="~/assets/css/components/feature/register/register.scss"> </style>