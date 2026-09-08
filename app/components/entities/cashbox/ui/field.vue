<template>
    <div class="CashboxField">
        <p v-if="!isEditable || !edit" class="CashboxField__label">
            {{ t(`cashbox.item.${name}`) }}: 
            <span class="CashboxField__value">{{ value ? value : cashbox[name] }}</span>
        </p>

        <UFormField v-else-if="isEditable && edit" class="CashboxField__label" :label="`${t(`cashbox.item.${name}`)}:`" :name="name" >
            <Input class="CashboxField__input" v-model="data[name]" @click.stop/>
        </UFormField>
    </div>
</template>

<script setup lang="ts">
import Input from '~/components/shared/ui/input/index.vue';
import type { Cashbox } from '../model/types';

const { t } = useI18n();

const data = defineModel<any>();

const props = defineProps<{
    isEditable: boolean,
    edit?: boolean,
    value?: any,

    cashbox: Cashbox,
    name: 'title' | 'description' | 'balance'
}>()
</script>