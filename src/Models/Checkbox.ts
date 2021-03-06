import { ETypes } from "../util";
import Element from "./Element";

export default class ECheckbox extends Element {
    constructor(index: number, name: string, label: string, required: boolean, initValue: boolean = false) {
        super(index, name, label, required, initValue);
        this.etype = ETypes.ECheckbox;
    }
}
