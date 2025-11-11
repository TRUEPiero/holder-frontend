<template>
    <UMain class="ProjectMain">
        <Sidebar/>
        <section class="p-[20px]">
            <slot/>
        </section>
    </UMain>
</template>

<script setup lang="ts">
    import Sidebar from '~/components/widgets/sidebar/index.vue'

</script>

<style src="~/assets/css/layouts/project.scss"></style>
