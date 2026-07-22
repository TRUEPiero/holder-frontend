<template>
    <div class="CashboxListMain">
        <UCard 
            class="CashboxList"
            variant="subtle"
            :ui="{
                body: 'CashboxList__body'
            }"
        >
            <!-- action component -->
            <div class="ActionBlock">
                <CreateCashbox :project-id="props.projectId" @created="getCashboxes"/>

                <Input 
                    class="SearchInput"
                    v-model="search"   
                    :placeholder="t('cashbox.list.search_placeholder')"
                />
            </div>

            <div class="CashboxesBlock">
                <Loader 
                    v-if="loading"
                    class="h-[140px]"
                />
                
                <UTree
                    v-model="test"
                    :items="filtteredCashboxes"
                    label-key="title"
                    @update:model-value="setActiveCashbox"
                    :ui="{root: 'CashboxesTree', item: 'CashboxesTree__item', link: 'CashboxesTree__link'}"
                >
                    <template #item="{item}">
                        <CashboxItem
                            :project-id="projectId"
                            :cashbox-id="item.id"
                        />
                    </template>
                </UTree>
            </div>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import Input from '~/components/shared/ui/input/index.vue';
import Loader from '~/components/shared/ui/loader/index.vue';

import CashboxItem from '~/components/widgets/cashbox/item/ui/CashboxItem.vue';
import CreateCashbox from '~/components/features/cashbox-create/ui/CreateCashbox.vue';

import { getByProject } from '~/components/entities/cashbox/api/getByProject';

import type { Cashbox } from '~/components/entities/cashbox/model/types';

const props = defineProps<{
    projectId: number
}>()

const cashboxStore = useCashboxStore();
const { t } = useI18n();

const cashboxes = ref<Cashbox[]>([]);
const loading = ref(false);
const activeId = ref<number>();
const search = ref('');
const test = ref();

const needReload = computed(() => cashboxStore.needReload)
const filtteredCashboxes = computed(() => {
    if(!search.value) return cashboxes.value;

    return cashboxes.value.filter(cashbox => {
        const title = cashbox.title.toLowerCase();
        const searchValue = search.value.toLowerCase();

        return title.includes(searchValue);
    })
})

const setActiveCashbox = (data: Cashbox) => {
    cashboxStore.setActive(data);
}

const getCashboxes = async () => {
    loading.value = true;
    
    const result = await getByProject(props.projectId);
    if (!result) return;

    cashboxes.value = result.data;
    cashboxStore.setCashboxes(cashboxes.value);

    loading.value = false;
}

watch(needReload, async (value) => {
    if(!value) return;

    await getCashboxes();
    cashboxStore.setNeedReload(false);
})

onMounted(async () => {
    await getCashboxes();
})
</script>

<style src="~/assets/css/components/widgets/cashbox/list.scss"></style>