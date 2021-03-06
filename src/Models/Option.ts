import { ETypes } from "../util";
import Element from "./Element";

export class EOption extends Element {
    constructor(index: number, key: string, value: string) {
        super(index, key, key, false, value);
        this.etype = ETypes.EOption;
    }
}