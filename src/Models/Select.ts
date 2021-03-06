import { action, observable } from "mobx";
import { ETypes } from "../util";
import Element from "./Element";
import { EOption } from "./Option";

export default class ESelect extends Element {
    options: EOption[]

    constructor(index: number, name: string, label: string, initValue: any, required: boolean) {
        super(index, name, label, required, initValue);
        this.options = [];
        this.etype = ETypes.ESelect;
    }
}