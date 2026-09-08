<template>
    <USidebar 
        class="Sidebar"
        variant="inset"
        collapsible="icon"
        v-model:open="open"
        :ui="{header: 'Sidebar__header'}">

        <template #header>
            <Button 
                :label="open ? 'Holder' : 'H'" 
                variant="link" 
                @click="goToList"
            />
            <Button 
                class="action closeIcon"
                :icon="`i-lucide-chevron-${open ? 'left' : 'right'}`"
                size="xs"
                variant="soft"
                @click="toggleSidebar"
            />
        </template>

        <template #content>

        </template>

        <template #footer>
            <UDropdownMenu
                :items="footerDropdownItems"
                :content="{
                    side: 'top',
                    align: 'center'
                }"
                arrow
            >
                <Button
                    v-bind="user"
                    :label="user?.name"
                    :avatar="{
                        src: user?.avatar, 
                        text: userStore.initials(),
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
import { useToggle } from '../lib/toggle';
import type { DropdownMenuItem } from '@nuxt/ui';
import { unauthorize } from '~/components/entities/user/lib/unauthorize';

const { t } = useI18n();
const router = useRouter();
const userStore = useUserStore();
const {open, toggleSidebar} = useToggle();

const loading = ref(false);
const footerDropdownItems = ref<DropdownMenuItem[][]>([
    [
        {
            icon: 'i-lucide-settings',
            label: t('sidebar.settings'),
            onSelect: () => goToUserSettings()
        },
        {
            icon: 'i-lucide-log-out',
            label: t('sidebar.logout'),
            onSelect: () => logout()
        }
    ]
])

const user = computed(() => userStore.user)

const goToList = () => router.push('/project/list');
const goToUserSettings = () => router.push('/user/settings');

const logout = async () => {
    loading.value = true;

    const unauthorized = await unauthorize();
    if(!unauthorized) return;

    router.push('/login')

    loading.value = false;
}
</script>

<style src="~/assets/css/components/widgets/sidebar/index.scss"></style>