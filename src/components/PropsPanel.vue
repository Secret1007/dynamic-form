<!--
 * @Description: 右侧属性配置面板
-->
<template>
    <div>
        <FormItemProps />
    </div>
</template>
<script lang="ts">
import { useFormDesignState } from "@/core/hooks/useFormDesignState";
import { TabPane, Tabs } from "ant-design-vue";
import { defineComponent } from "vue";
import FormItemProps from "./FormItemProps.vue";

type ChangeTabKey = 1 | 2;
export interface IPropsPanel {
    changeTab: (key: ChangeTabKey) => void;
}
export default defineComponent({
    name: "PropsPanel",
    components: {
        Tabs,
        TabPane,
        FormItemProps,
    },
    setup() {
        const { formConfig } = useFormDesignState();
        return { formConfig };
    },
});
</script>

<style lang="less" scoped>
:deep(.ant-tabs) {
    box-sizing: border-box;

    form {
        width: 100%;
        height: 85vh;
        margin-right: 10px;
        overflow: hidden auto;
    }

    .hint-box {
        margin-top: 200px;
    }

    .ant-form-item,
    .ant-slider-with-marks {
        margin-right: 20px;
        margin-bottom: 0;
        margin-left: 10px;
    }

    .ant-form-item {
        // width: 100%;
        margin-bottom: 0;

        .ant-form-item-label {
            line-height: 2;
            vertical-align: text-top;
        }
    }

    .ant-input-number {
        width: 100%;
    }
}
</style>
