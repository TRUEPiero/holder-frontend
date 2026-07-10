<template>
    <UMain class="DefaultLayout">
        <Sidebar />
        <div class="ProjectContainer rounded-xl ring ring-default bg-default">
            <slot />
        </div>
    </UMain>
</template>

<script setup lang="ts">
import Sidebar from '~/components/widgets/sidebar/ui/Sidebar.vue';
</script>

<style src="~/assets/css/layouts/default.scss"></style>
