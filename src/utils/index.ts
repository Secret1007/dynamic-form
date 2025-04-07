import { isArray, isNumber, uniqueId } from "lodash-es";
import type { IVFormComponent } from "../typings/v-form-components";

/**
 * 生成key
 * @param [formItem] 需要生成 key 的控件，可选，如果不传，默认返回一个唯一 key
 * @returns {string|boolean} 返回一个唯一 id 或者 false
 */
export function generateKey(formItem?: IVFormComponent): string | boolean {
    if (formItem && formItem.component) {
        const key = uniqueId(`${toLine(formItem.component)}_`);
        formItem.key = key;
        formItem.field = key;

        return true;
    }
    return uniqueId("key_");
}
/**
 * 驼峰转下划线
 * @param str
 */
export function toLine(str: string) {
    return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}

/**
 * 遍历表单项
 * @param array
 * @param cb
 */
export function formItemsForEach(
    array: IVFormComponent[],
    cb: (item: IVFormComponent) => void
) {
    if (!isArray(array)) return;
    const traverse = (schemas: IVFormComponent[]) => {
        schemas.forEach((formItem: IVFormComponent) => {
            if (["Grid"].includes(formItem.component)) {
                // 栅格布局
                formItem.columns?.forEach((item) => traverse(item.children));
            } else {
                cb(formItem);
            }
        });
    };
    traverse(array);
}

/**
 * 移除数组中指定元素，value可以是一个数字下标，也可以是一个函数，删除函数第一个返回true的元素
 * @param array {Array<T>} 需要移除元素的数组
 * @param value {number | ((item: T, index: number, array: Array<T>) => boolean}
 * @returns {T} 返回删除的数组项
 */
export function remove<T>(
    array: Array<T>,
    value: number | ((item: T, index: number, array: Array<T>) => boolean)
): T | undefined {
    let removeVal: Array<T | undefined> = [];
    if (!isArray(array)) return undefined;
    if (isNumber(value)) {
        removeVal = array.splice(value, 1);
    } else {
        const index = array.findIndex(value);
        if (index !== -1) {
            removeVal = array.splice(index, 1);
        }
    }
    return removeVal.shift();
}
