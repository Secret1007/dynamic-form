import type { IVFormComponent } from "../typings/v-form-components";
import type { Component } from "vue";
import { componentMap as Cmp } from "../components";
import { isArray } from "@/utils/is";
const componentMap = new Map<string, Component>();

//如果有其它控件，可以在这里初始化

//注册Ant控件库
Cmp.forEach((value, key) => {
    componentMap.set(key, value);
});

export { componentMap };

/**
 * 设置自定义表单控件
 * @param {IVFormComponent | IVFormComponent[]} config
 */
export function setFormDesignComponents(
    config: IVFormComponent | IVFormComponent[]
) {
    if (isArray(config)) {
        config.forEach((item) => {
            const { componentInstance: component, ...rest } = item;
            componentMap[item.component] = component;
            customComponents.push(Object.assign({ props: {} }, rest));
        });
    } else {
        const { componentInstance: component, ...rest } = config;
        componentMap[config.component] = component;
        customComponents.push(Object.assign({ props: {} }, rest));
    }
}

//外部设置的自定义控件
export const customComponents: IVFormComponent[] = [];
export const baseComponents: IVFormComponent[] = [
    {
        component: "Input",
        label: "输入框",
        icon: "bi:input-cursor-text",
        field: "",
        colProps: { span: 24 },
        componentProps: {
            type: "text",
        },
    },
    {
        component: "InputTextArea",
        label: "文本域",
        icon: "ant-design:file-text-filled",
        field: "",
        colProps: { span: 24 },
        componentProps: {},
    },
    {
        component: "Select",
        label: "下拉选择",
        icon: "gg:select",
        field: "",
        colProps: { span: 24 },
        componentProps: {
            options: [
                {
                    label: "选项1",
                    value: "1",
                },
                {
                    label: "选项2",
                    value: "2",
                },
            ],
        },
    },
];
