<template>
    <n-modal
        v-model:show="modalVisible"
        :bordered="false"
        aria-modal="false"
        preset="card"
        size="huge"
        :style="{ width: '800px' }"
        :title="titleModal"
    >
        <template #footer>
            <n-space justify="end">
                <n-button type="default" size="large" @click="onCancel">Cancel</n-button>
                <n-button
                    type="primary"
                    size="large"
                    v-if="isModalManagement.event === 'edit'"
                    @click="onSubmit"
                >
                    Save
                </n-button>
            </n-space>
        </template>
    </n-modal>
</template>

<script>
import { defineComponent,computed,watch } from 'vue';
import {  NModal,NButton,NSpace } from "naive-ui"

export default defineComponent({
    name: 'ViewDetailModal',
    components: {
		NModal,
        NButton,
        NSpace
	},
    props: {
        isModalManagement: {
            type: Object,
            required: true,
            default: () => ({ value: false, event: '' })
        },
        titleModal: {
            type: String,
            required: true
        },
        onSubmit: {
            type: Function,
            required: true
        },
        onCancel: {
            type: Function,
            required: true
        }
    },
    setup(props, { emit }) {
        const modalVisible = computed({
            get: () => props.isModalManagement.value,
            set: (newValue) => {
                emit('update:isModalManagement', { ...props.isModalManagement, value: newValue });
            }
        });
        watch(() => props.isModalManagement.value, (newValue) => {
            modalVisible.value = newValue;
        });
        return {
            ...props,
            modalVisible
        };
    }
});
</script>