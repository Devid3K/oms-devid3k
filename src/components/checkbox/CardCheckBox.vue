<template>
    <div>
        <n-card class="drop-shadow !rounded-2xl !border-gray-200">
            <n-space vertical>
                <h5 class="mb-2 text-lg text-blue-500 font-normal">{{ data.header }}</h5>
                <div v-for="(item, index) in data.list" :key="index">
                    <NCheckbox v-model:checked="item.value">
                        <p>{{ item.name }}</p>
                    </NCheckbox>
                </div>
            </n-space>
        </n-card>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { PropType } from 'vue';
import { NCheckbox, NSpace, NCard } from "naive-ui"

interface CheckBoxItem {
    name: string;
    value: boolean;
}

interface CheckBoxValue {
    header: string;
    list: CheckBoxItem[];
}

export default defineComponent({
    name: 'CardCheckBox',
    components: {
        NCheckbox,
        NSpace,
        NCard
    },
    props: {
        checkBoxValue: {
            type: Object as PropType<CheckBoxValue>,
            required: true
        }
    },
    setup(props) {
        const data = ref(props.checkBoxValue)
        return {
            data
        }
    }
});
</script>
