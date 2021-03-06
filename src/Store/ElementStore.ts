import { action, computed, configure, observable } from "mobx";
import { createContext } from "react";
import EButton from "../Models/Button";
import ECheckbox from "../Models/Checkbox";
import Element from '../Models/Element';
import EInput from "../Models/Input";
import { EOption } from "../Models/Option";
import ESelect from "../Models/Select";

configure({ enforceActions: 'always' });

class ElementStore {
    @observable elements = new Map<number, Element>();
    @observable editingElement: Element | null = null;
    @observable editElementMode = false;
    @observable editFormMode = true;
    @observable labelSubmitButton = "Submit";

    @computed get elementsByIndex() {
        return Array.from(this.elements.values()).sort((a, b) => a.index - b.index);
    }

    @action addNewElement = (type: string) => {
        let newIndex = this.elements.size + 1;
        let newName = "Name" + newIndex;
        let newlabel = "Label" + newIndex;
        switch (type) {
            case "input":
                let newInput = new EInput(newIndex, newName, newlabel, "", false);
                this.elements.set(newInput.id, newInput);
                break;
            case "checkbox":
                let newCheckbox = new ECheckbox(newIndex, newName, newlabel, false);
                this.elements.set(newCheckbox.id, newCheckbox);
                break;
            case "select":
                let newSelect = new ESelect(newIndex, newName, newlabel, undefined, false);
                this.elements.set(newSelect.id, newSelect);
                break;
            case "button":
                let newButton = new EButton(newIndex, newlabel);
                this.elements.set(newButton.id, newButton);
                break;
            default:
                newInput = new EInput(newIndex, newName, newlabel, "", false);
                this.elements.set(newInput.id, newInput);
                break;
        }
    }

    @action addNewOption = (select: ESelect) => {
        select.options.push(this.createNewOption());
    }

    @action createNewOption = (key: string = "Option", value: string = "Value") => {
        let newIndex = this.elements.size + 1;
        return new EOption(newIndex, key, value);
    }

    @action removeOption = (id: number, select: ESelect) => {
        select.options = select.options.filter(x => x.id !== id);
    }

    @action clearEditingElement = () => {
        this.editingElement = null;
    };

    @action enableEditMode = () => {
        this.editFormMode = true;
    }

    @action disableEditMode = () => {
        this.editFormMode = false;
    }

    @action enableEditElementMode = () => {
        this.editElementMode = true;
    }

    @action disableEditElementMode = () => {
        this.editElementMode = false;
    }

    @action setLabelSubmitButton = (label: string) => {
        this.labelSubmitButton = label;
    }

    @action setEditingElement = (element: Element) => {
        if (element) {
            this.editingElement = element;
            this.elements.set(element.id, element);
            this.enableEditElementMode();
        }
    }

    @action editOptionProp = (option: EOption, input: ESelect, name: string, value: string) => {
        if (option && input) {
            input.options.splice(
                input.options.findIndex((o) => o.id === option.id),
                1,
                {
                    ...option,
                    [name]: value,
                }
            );
            this.setEditingElement(input);
        }
    }

    @action removeElement = (id: number) => {
        this.elements.delete(id);
    }
}

export default createContext(new ElementStore());