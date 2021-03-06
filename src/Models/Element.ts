export default class Element extends Object {
    id: number;
    index: number;
    name: string;
    label: string;
    value: any;
    required: boolean;
    etype: string;

    private static ids: number[] = [];
    private static getNewId = () => {
        let i = 0;
        while (Element.ids.filter(x => x === i).length > 0) {
            i++;
        }
        Element.ids.push(i);
        return i;
    }

    constructor(index: number, name: string, label: string, required: boolean, initValue: any = undefined) {
        super();

        this.id = Element.getNewId();
        this.index = index;
        this.name = name;
        this.label = label;
        this.required = required;
        this.value = initValue;
        this.etype = "element";
    }
}