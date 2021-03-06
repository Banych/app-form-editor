import { ETypes } from "../util";
import Element from "./Element";

export default class EInput extends Element {
    type: string;
    placeholder: string;

    constructor(index: number, name: string, label: string, initValue: string, required: boolean, type: string = 'text', placeholder: string = "") {
        super(index, name, label, required, initValue);
        this.type = type;
        this.placeholder = placeholder;
        this.etype = ETypes.EInput;
    }
}