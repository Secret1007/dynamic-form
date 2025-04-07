<template>
    <div>
        <draggable
            tag="ul"
            :model-value="list"
            v-bind="{
                group: { name: 'form-draggable', pull: 'clone', put: false },
                sort: false,
                clone: cloneItem,
                animation: 180,
                ghostClass: 'moving',
            }"
            item-key="type"
            @start="handleStart($event, list)"
        >
            <template #item="{ element, index }">
                <li
                    class="bs-box text-ellipsis"
                    @dragstart="$emit('add-attrs', list, index)"
                    @click="$emit('handle-list-push', element)"
                >
                    <Icon :icon="element.icon" />
                    {{ element.label }}
                </li>
            </template>
        </draggable>
    </div>
</template>
<script setup lang="ts">
import { type PropType } from "vue";
import draggable from "vuedraggable";
import type { IVFormComponent } from "../typings/v-form-components";

const props = defineProps({
    list: {
        type: [Array] as PropType<IVFormComponent[]>,
        default: () => [],
    },
    handleListPush: {
        type: Function,
        default: null,
    },
});

const cloneItem = (one: IVFormComponent) => {
    return props.handleListPush(one);
};
</script>

<style></style>
