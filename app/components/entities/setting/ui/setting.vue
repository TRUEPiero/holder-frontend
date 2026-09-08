<template>
    <UFormField 
        class="field" 
        :label="setting.title" 
        :name="setting.code" 
        :description="setting.desctiprion" 
        :required="setting.isRequired"
    >
        <Input 
            v-if="setting.type === 'string' || setting.type === 'number' || setting.type === 'float'" 
            v-model="setting.value" 
            :type="setting.type"
            :disabled="setting.isDisabled"
        />
        <UCheckbox 
            v-else-if="setting.type === 'boolean'" 
            v-model="setting.value" 
            :disabled="setting.isDisabled"
        />

    </UFormField>

</template>
<script setup lang="ts">
import Input from '~/components/shared/ui/input/index.vue';
import type { Setting } from '../model/type';

    const props = defineProps<{
        setting: Setting
    }>()
</script>

<style src="~/assets/css/components/entities/setting/index.scss"></style>