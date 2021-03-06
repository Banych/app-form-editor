export enum InputTypes { text = "text", email = "email", phone = "phone", number = "number" }

export const enumToArray = (enn: any) => {
    return Object.keys(enn)
        .map(key => ({ key: key, value: key, text: enn[key] }));
}

export enum ETypes { ESelect = "eselect", ECheckbox = "echeckbox", EButton = "ebutton", EInput = "einput", EOption = "eoption" }