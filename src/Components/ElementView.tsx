import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Form } from "semantic-ui-react";
import Element from "../Models/Element";
import EInput from "../Models/Input";
import ESelect from "../Models/Select";
import { ETypes } from "../util";

interface IProps {
  element: Element;
}

const ElementView: React.FC<IProps> = ({ element }) => {
  const displayElementByType = () => {
    switch (element.etype) {
      case ETypes.ECheckbox:
        return (
          <Form.Checkbox
            defaultChecked={element.value}
            name={element.name}
            label={element.label}
            required={element.required}
          />
        );
      case ETypes.EInput:
        return (
          <Form.Input
            name={element.name}
            label={element.label}
            defaultValue={element.value}
            required={element.required}
            type={(element as EInput).type}
            placeholder={(element as EInput).placeholder}
          />
        );
      case ETypes.ESelect:
        return (
          <Form.Select
            options={(element as ESelect).options.map((opt) => ({
              key: opt.name,
              value: opt.value,
              text: opt.name,
            }))}
            label={element.label}
            name={element.name}
            defaultValue={element.value}
            required={element.required}
          />
        );
    }
  };

  return <Fragment>{displayElementByType()}</Fragment>;
};

export default observer(ElementView);
// case ETypes.ECheckbox:
//         let checkbox: ECheckbox = element;
//
//         case ETypes.EInput:
//             let input: EInput = (EInput)element;
//             return <Form.Input
//                 defValue={input.value}
//                 name={input.name}
//                 label={input.label}

//             />
