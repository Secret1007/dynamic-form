<!--  -->
<template>
    <div class="form-panel v-form-container">
        <Form v-bind="formConfig">
            <div class="draggable-box">
                <draggable
                    class="list-main ant-row"
                    group="form-draggable"
                    :component-data="{
                        name: 'list',
                        tag: 'div',
                        type: 'transition-group',
                    }"
                    ghostClass="moving"
                    :animation="180"
                    handle=".drag-move"
                    v-model="formConfig.schemas"
                    item-key="key"
                    @add="addItem"
                    @start="handleDragStart"
                >
                    <template #item="{ element }">
                        <LayoutItem
                            class="drag-move"
                            :schema="element"
                            :data="formConfig"
                            :current-item="formConfig.currentItem || {}"
                        />
                    </template>
                </draggable>
            </div>
        </Form>
    </div>
</template>
<script setup lang="ts">
import { Form } from "ant-design-vue";
import { cloneDeep } from "lodash-es";
import draggable from "vuedraggable";
import { useFormDesignState } from "../core/hooks/useFormDesignState";
import LayoutItem from "./LayoutItem.vue";

const { formConfig } = useFormDesignState();

const emit = defineEmits(["handleSetSelectItem"]);
/**
 * 拖拽完成事件
 * @param newIndex
 */
const addItem = ({ newIndex }: any) => {
    formConfig.value.schemas = formConfig.value.schemas || [];
    const schemas = formConfig.value.schemas;
    schemas[newIndex] = cloneDeep(schemas[newIndex]);
    emit("handleSetSelectItem", schemas[newIndex]);
};

/**
 * 拖拽开始事件
 * @param e {Object} 事件对象
 */
const handleDragStart = (e: any) => {
    emit("handleSetSelectItem", formConfig.value.schemas[e.oldIndex]);
};
</script>

<style scoped lang="less">
.v-form-container {
    // 内联布局样式
    .ant-form-inline {
        .list-main {
            display: flex;
            flex-wrap: wrap;
            place-content: flex-start flex-start;

            .layout-width {
                width: 100%;
            }
        }

        .ant-form-item-control-wrapper {
            min-width: 175px !important;
        }
    }
}

.form-panel {
    position: relative;
    height: 100%;

    .empty-text {
        position: absolute;
        z-index: 100;
        inset: -10% 0 0;
        height: 150px;
        margin: auto;
        color: #aaa;
    }

    .draggable-box {
        height: calc(100vh - 120px);
        // width: 100%;
        overflow: auto;

        .drag-move {
            min-height: 62px;
            cursor: move;
        }

        .list-main {
            // 列表动画
            .list-enter-active {
                transition: all 0.5s;
            }

            .list-leave-active {
                transition: all 0.3s;
            }

            .list-enter,
            .list-leave-to {
                transform: translateX(-100px);
                opacity: 0;
            }

            .list-enter {
                height: 30px;
            }
        }
    }
}
</style>
