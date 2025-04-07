import type { ComponentOptions } from "vue";
import type { IAnyObject } from "./base-type";
import type { FormProps } from "ant-design-vue";
import type { FormItem } from "../components/FormItem/formItem";

type labelLayout = "flex" | "Grid";
export type PropsTabKey = 1 | 2 | 3;
/**
 * 表单配置
 */
export type PickAntFormConfig = Pick<
    FormProps,
    | "layout"
    | "size"
    | "colon"
    | "labelAlign"
    | "disabled"
    | "labelCol"
    | "wrapperCol"
    | "hideRequiredMark"
>;

// 使用extends 而不使用 &联结 是为了避免 type:check指令类型重载错误
export interface IFormConfig extends PickAntFormConfig {
    labelLayout?: labelLayout;
    labelWidth?: number;
    schemas: IVFormComponent[];
    currentItem?: IVFormComponent;
    activeKey?: PropsTabKey;
}
export interface IVFormComponent {
    // extends Omit<FormSchema, 'component' | 'label' | 'field' | 'rules'> {
    // 对应的字段
    field?: string;
    // 组件类型
    component: string;
    // 组件label
    label?: string;
    // 自定义组件控件实例
    componentInstance?: ComponentOptions<any>;
    // 组件icon
    icon?: string;
    // 组件校验规则
    rules?: Partial<IValidationRule>[];
    // 是否隐藏
    hidden?: boolean;
    // 隐藏label
    hiddenLabel?: boolean;
    // 组件宽度
    width?: string;
    // 是否必选
    required?: boolean;
    // 必选提示
    message?: string;
    // 提示信息
    helpMessage?: string;
    // 传给给组件的属性，默认会吧所有的props都传递给控件
    componentProps?: IAnyObject;
    // 监听组件事件对象，以v-on方式传递给控件
    on?: IAnyObject<(...any: []) => void>;
    // 组件选项
    options?: IAnyObject;
    // 唯一标识
    key?: string;
    // Reference formModelItem
    itemProps?: Partial<FormItem>;

    colProps?: Partial<ColEx>;
    // 联动字段
    link?: string[];
    // 联动属性变化的回调
    update?: (
        value: any,
        formItem: IVFormComponent,
        fApi: IVFormMethods
    ) => void;
    // 控件栅格数
    // span?: number;
    // 标签布局
    labelCol?: IAnyObject;
    // 组件布局
    wrapperCol?: IAnyObject;
    // 子控件
    columns?: Array<{ span: number; children: any[] }>;
}

export interface IValidationRule {
    trigger?: "change" | "blur" | ["change", "blur"];
    /**
     * validation error message
     * @type string | Function
     */
    message?: string | number;

    /**
     * built-in validation type, available options: https://github.com/yiminghe/async-validator#type
     * @default 'string'
     * @type string
     */
    type?: string;

    /**
     * indicates whether field is required
     * @default false
     * @type boolean
     */
    required?: boolean;

    /**
     * treat required fields that only contain whitespace as errors
     * @default false
     * @type boolean
     */
    whitespace?: boolean;

    /**
     * validate the exact length of a field
     * @type number
     */
    len?: number;

    /**
     * validate the min length of a field
     * @type number
     */
    min?: number;

    /**
     * validate the max length of a field
     * @type number
     */
    max?: number;

    /**
     * validate the value from a list of possible values
     * @type string | string[]
     */
    enum?: string | string[];

    /**
     * validate from a regular expression
     * @type boolean
     */
    pattern?: SelectValue;

    /**
     * transform a value before validation
     * @type Function
     */
    transform?: (value: any) => any;

    /**
     * custom validate function (Note: callback must be called)
     * @type Function
     */
    validator?: (rule: any, value: any, callback: () => void) => any;
}
