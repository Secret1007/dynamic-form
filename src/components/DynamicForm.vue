<!--  -->
<template>
    <div
        class="grid grid-cols-5 divide-x-3 divide-dashed divide-indigo-500 h-full w-full"
    >
        <div class="col-span-1">
            <DraggbleItem
                :list="baseComponents"
                :handleListPush="handleListPushDrag"
                @handle-list-push="handleListPush"
            />
        </div>
        <div class="col-span-3">
            <FormComponentPanel
                :current-item="formConfig.currentItem"
                @handle-set-select-item="handleSetSelectItem"
            />
        </div>
        <div class="col-span-1">
            <PropsPanel ref="propsPanel">
                <template
                    v-for="item of formConfig.schemas"
                    #[`${item.component}Props`]="data"
                >
                    <slot
                        :name="`${item.component}Props`"
                        v-bind="{ formItem: data, props: data.componentProps }"
                    ></slot>
                </template>
            </PropsPanel>
        </div>
    </div>
</template>
<script setup lang="ts">
import { baseComponents } from "../core/formItemConfig";
import DraggbleItem from "./DraggbleItem.vue";
import { provide, ref, type Ref } from "vue";
import type {
    IFormConfig,
    IVFormComponent,
} from "../typings/v-form-components";
import FormComponentPanel from "./FormComponentPanel.vue";
import { cloneDeep } from "lodash-es";
import { formItemsForEach, generateKey } from "../utils";
import { globalConfigState } from "../config/formItemPropsConfig";
import type { IFormDesignMethods } from "../typings/form-type";
import PropsPanel, { type IPropsPanel } from "./PropsPanel.vue";

const formModel = ref({});
const formConfig = ref<IFormConfig>({
    // 表单配置
    schemas: [],
    layout: "horizontal",
    labelLayout: "flex",
    labelWidth: 100,
    labelCol: {},
    wrapperCol: {},
    currentItem: {
        component: "",
        componentProps: {},
    },
    activeKey: 1,
});
const propsPanel = ref<null | IPropsPanel>(null);
/**
 * 单击控件时添加到面板中
 * @param item {IVFormComponent} 当前点击的组件
 */
const handleListPush = (item: IVFormComponent) => {
    const formItem = cloneDeep(item);
    setGlobalConfigState(formItem);
    generateKey(formItem);
    if (!formConfig.value.currentItem?.key) {
        handleSetSelectItem(formItem);
        formConfig.value.schemas &&
            formConfig.value.schemas.push(formItem as any);
        return;
    }
    handleCopy(formItem, false);
};
/**
 * 复制表单项，如果表单项为栅格布局，则遍历所有自表单项重新生成key
 * @param {IVFormComponent} formItem
 * @return {IVFormComponent}
 */
const copyFormItem = (formItem: IVFormComponent) => {
    const newFormItem = cloneDeep(formItem);
    if (newFormItem.component === "Grid") {
        formItemsForEach([formItem], (item) => {
            generateKey(item);
        });
    }
    return newFormItem;
};
/**
 * 复制或者添加表单，isCopy为true时则复制表单
 * @param item {IVFormComponent} 当前点击的组件
 * @param isCopy {boolean} 是否复制
 */
const handleCopy = (
    item: IVFormComponent = formConfig.value.currentItem as IVFormComponent,
    isCopy = true
) => {
    const key = formConfig.value.currentItem?.key;
    /**
     * 遍历当表单项配置，如果是复制，则复制一份表单项，如果不是复制，则直接添加到表单项中
     * @param schemas
     */
    const traverse = (schemas: IVFormComponent[]) => {
        // 使用some遍历，找到目标后停止遍历
        schemas.some((formItem: IVFormComponent, index: number) => {
            if (formItem.key === key) {
                // 判断是不是复制
                isCopy
                    ? schemas.splice(index, 0, copyFormItem(formItem))
                    : schemas.splice(index + 1, 0, item);
                const event = {
                    newIndex: index + 1,
                };
                // 添加到表单项中
                handleBeforeColAdd(event, schemas, isCopy);
                return true;
            }
            if (["Grid", "Tabs"].includes(formItem.component)) {
                // 栅格布局
                formItem.columns?.forEach((item) => {
                    traverse(item.children);
                });
            }
        });
    };
    if (formConfig.value.schemas) {
        traverse(formConfig.value.schemas as any);
    }
};

const setGlobalConfigState = (formItem: IVFormComponent) => {
    formItem.colProps = formItem.colProps || {};
    formItem.colProps.span = globalConfigState.span;
};
const handleListPushDrag = (item: IVFormComponent) => {
    const formItem = cloneDeep(item);
    setGlobalConfigState(formItem);
    generateKey(formItem);
    return formItem;
};
/**
 * 选中表单项
 * @param schema 当前选中的表单项
 */
const handleSetSelectItem = (schema: IVFormComponent) => {
    formConfig.value.currentItem = schema as any;
    handleChangePropsTabs(
        schema.key
            ? formConfig.value.activeKey! === 1
                ? 2
                : formConfig.value.activeKey!
            : 1
    );
};

/**
 * 添加到表单中
 * @param newIndex {object} 事件对象
 * @param schemas {IVFormComponent[]} 表单项列表
 * @param isCopy {boolean} 是否复制
 */
const handleBeforeColAdd = (
    { newIndex }: any,
    schemas: IVFormComponent[],
    isCopy = false
) => {
    const item = schemas[newIndex];
    isCopy && generateKey(item);
    handleSetSelectItem(item);
};

const setFormConfig = (config: IFormConfig) => {
    //外部导入时，可能会缺少必要的信息。
    config.schemas = config.schemas || [];
    config.schemas.forEach((item) => {
        item.colProps = item.colProps || { span: 24 };
        item.componentProps = item.componentProps || {};
        item.itemProps = item.itemProps || {};
    });
    formConfig.value = config as any;
};
/**
 * 切换属性面板
 * @param key
 */
const handleChangePropsTabs = (key: PropsTabKey) => {
    formConfig.value.activeKey = key;
};
const setFormModel = (key, value) => (formModel.value[key] = value);
provide("formModel", formModel);
provide<(key: String, value: any) => void>("setFormModelMethod", setFormModel);
provide<Ref<IFormConfig>>("formConfig", formConfig as any);
// 把祖先组件的方法项注入到子组件中，子组件可通过inject获取
provide<IFormDesignMethods>("formDesignMethods", {
    handleBeforeColAdd,
    handleCopy,
    handleListPush,
    handleSetSelectItem,
    setFormConfig,
});
</script>

<style></style>
