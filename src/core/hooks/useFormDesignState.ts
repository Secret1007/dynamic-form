import { inject, type Ref } from "vue";
import type { IFormDesignMethods } from "../../typings/form-type";
import type { IFormConfig } from "../../typings/v-form-components";

/**
 * 获取formDesign状态
 */
export function useFormDesignState() {
    const formConfig = inject("formConfig") as Ref<IFormConfig>;
    const formDesignMethods = inject("formDesignMethods") as IFormDesignMethods;
    return { formConfig, formDesignMethods };
}

export function useFormModelState() {
    const formModel = inject("formModel") as Ref<{}>;
    const setFormModel = inject("setFormModelMethod") as (
        key: String,
        value: any
    ) => void;
    return { formModel, setFormModel };
}
