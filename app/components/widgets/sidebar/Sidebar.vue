<template>
    <USidebar 
        class="Sidebar"
        variant="inset"
        collapsible="icon"
        v-model:open="open"
        :ui="{header: 'Sidebar__header'}">

        <template #header>
            <h1>{{open ? 'Holder' : 'H'}}</h1>
            <Button 
                class="action closeIcon"
                :icon="`i-lucide-chevron-${open ? 'left' : 'right'}`"
                size="xs"
                variant="soft"
                @click="toggleSidebar"
            />
        </template>

        <template #footer>
            <UDropdownMenu>
                <Button
                    v-bind="user"
                    :label="user?.name"
                    :avatar="{
                        src: user?.avatar, 
                        text: 'VA',
                        size: '2xl'
                    }"
                    variant="link"
                    class="UserBtn"
                    :ui="{}"
                />
            </UDropdownMenu>
        </template>
    </USidebar>
</template>

<script setup lang="ts">
import Button from '~/components/shared/ui/button/index.vue'

const userStore = useUserStore();

const open = ref(true)
const user = computed(() => userStore.user)

const toggleSidebar = () => {
    open.value = !open.value
}
</script>

<style src="~/assets/css/components/widgets/sidebar/index.scss"></style>