import type { IFormConfig, IVFormComponent } from "./v-form-components";

export interface IFormDesignMethods {
    // 设置当前选中的控件
    handleSetSelectItem(item: IVFormComponent): void;
    // 添加控件到formConfig.formItems中
    handleListPush(item: IVFormComponent): void;
    // 复制控件
    handleCopy?(item?: IVFormComponent, isCopy?: boolean): void;
    // 添加控件属性
    handleAddAttrs?(schemas: IVFormComponent[], index: number): void;
    setFormConfig(config: IFormConfig): void;
    // 添加到表单中之前触发
    handleBeforeColAdd(
        event: { newIndex: string },
        schemas: IVFormComponent[],
        isCopy?: boolean
    ): void;
}
