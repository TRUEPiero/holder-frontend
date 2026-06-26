<template>
    <UMain class="DefaultLayout bg-neutral-50 dark:bg-neutral-950">
        <Sidebar />
        <div class="ProjectContainer p-[20px] flex-1 flex flex-col m-4 ml-0 rounded-xl ring ring-default bg-default">
            <slot />
        </div>
    </UMain>
</template>

<script setup lang="ts">
import Sidebar from '~/components/widgets/sidebar/Sidebar.vue';
</script>

<style src="~/assets/css/layouts/default.scss"></style>
