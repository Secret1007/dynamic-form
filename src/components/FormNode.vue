<template>
    <div
        class="drag-move-box"
        @click.stop="handleSelectItem"
        :class="{ active: schema.key === formConfig.currentItem?.key }"
    >
        <div class="form-item-box">
            <VFormItem :formConfig="formConfig" :schema="schema" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, type PropType } from "vue";
import { useFormDesignState } from "../core/hooks/useFormDesignState";
import type { IVFormComponent } from "../typings/v-form-components";
import VFormItem from "./vFormItem/index.vue";

const props = defineProps({
    schema: {
        type: Object as PropType<IVFormComponent>,
        required: true,
    },
});
const { formConfig, formDesignMethods } = useFormDesignState();
const state = reactive({});
const handleSelectItem = () => {
    // 调用 formDesignMethods
    formDesignMethods.handleSetSelectItem(props.schema);
};
</script>

<style></style>
