import type {
    VNode,
    VNodeChild,
    ComponentPublicInstance,
    FunctionalComponent,
    PropType as VuePropType,
} from "vue";
declare global {
    namespace JSX {
        // tslint:disable no-empty-interface
        type Element = VNode;
        // tslint:disable no-empty-interface
        type ElementClass = ComponentRenderProxy;
        interface ElementAttributesProperty {
            $props: any;
        }
        interface IntrinsicElements {
            [elem: string]: any;
        }
        interface IntrinsicAttributes {
            [elem: string]: any;
        }
    }
}
