<template>
    <UForm
        class="RegisterForm"
        :state=state
        :schema="schema"
        @submit="onSubmit"
    >
        <UFormField class="RegisterForm__field" :label="t('register.form.email')" name="email">
            <Input v-model="state.email" type="text" :placeholder="t('register.form.enter_email')"/>
        </UFormField>

        <div class="RegisterForm__footer">
            <Button :label="t('register.form.submit')" :type="'submit'"/>
        </div>
    </UForm>
</template>

<script setup lang="ts">
import Input from '~/components/shared/ui/input/index.vue'
import Button from '~/components/shared/ui/button/index.vue'

const { t } = useI18n();

const state = reactive({
    email: ''
}) 

const schema = ref()

const onSubmit = () => {}
</script>