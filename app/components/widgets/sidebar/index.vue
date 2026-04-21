<template>
    <UDashboardSidebar collapsible
        v-model:collapsed="collapsed"
        :class="collapsed ? 'sidebar_collaps' : ''"
    >
        <template #header>
            <div class="sideRow">
                <span>header</span>
                <Button @click="collapsed = !collapsed"/>
            </div>
        </template>
        <template #default="{collapsed}">

        </template>
        <template #footer="{collapsed}">
            <div class="sideRow">
                <UAvatar icon="i-lucide-user" size="xl" />
                <UDropdownMenu arrow
                    v-if="!collapsed"
                    :content="{
                        side: 'top',
                        align: 'end'
                    }"
                    :items="menuItems"
                >
                    <Button icon="i-lucide-ellipsis-vertical" :variant="'ghost'"/>
                </UDropdownMenu>
            </div>
        </template>
    </UDashboardSidebar>
</template>

<script setup lang="ts">
    import type {DropdownMenuItem} from '@nuxt/ui';
    import { useUserStore, useProjectStore } from '~/stores';
    import Button from '~/components/shared/button/index.vue';

    const userStore = useUserStore();
    const projectStore = useProjectStore();
    const router = useRouter();

    const menuItems = ref<DropdownMenuItem[][]>([
        [
            {
                label: 'Настройки',
                onSelect: () => console.log('test'),
            },
            {
                label: 'Выйти',
                onSelect: () => logout()
            }
        ]
    ])
    const loading = ref(false);
    const collapsed = ref(false);

    const logout = async () => {
        loading.value = true;
        await userStore.resetUser();
        loading.value = false;
        router.push('/login');
    }
</script>

<style src="~/assets/css/components/widgets/sidebar/index.scss"></style>
