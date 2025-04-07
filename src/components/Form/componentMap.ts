/**
 * Component list, register here to setting it in the form
 */
import { Input, Select } from "ant-design-vue";
import type { ComponentType } from "./types";
import type { Component } from "vue";

const componentMap = new Map<ComponentType | string, Component>();

componentMap.set("Input", Input);
componentMap.set("InputTextArea", Input.TextArea);
componentMap.set("Select", Select);

export { componentMap };
