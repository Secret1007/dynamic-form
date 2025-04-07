<template>
    <Col v-bind="colPropsComputed">
        <FormNode
            :key="schema.key"
            :schema="schema"
            :current-item="currentItem"
            @handle-copy="$emit('handle-copy')"
            @handle-delete="$emit('handle-delete')"
    /></Col>
</template>
<script setup lang="ts">
import { computed, type PropType } from "vue";
import type { IVFormComponent } from "../typings/v-form-components";
import FormNode from "./FormNode.vue";
import { Col } from "ant-design-vue";
const props = defineProps({
    schema: {
        type: Object as PropType<IVFormComponent>,
        required: true,
    },
    currentItem: {
        type: Object,
        required: true,
    },
});
const emit = defineEmits(["handle-copy", "handle-delete"]);
const colPropsComputed = computed(() => {
    const { colProps = {} } = props.schema;
    return colProps;
});
</script>
<style></style>
