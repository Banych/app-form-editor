import { ETypes } from "../util";
import Element from "./Element";

export default class EButton extends Element {
    constructor(index: number, label: string) {
        super(index, "button", label, false);
        this.etype = ETypes.EButton;
    }
}