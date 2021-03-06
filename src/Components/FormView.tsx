import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Form, Segment } from "semantic-ui-react";
import ElementStore from "../Store/ElementStore";
import ElementView from "./ElementView";

const FormView = () => {
  const elementStore = useContext(ElementStore);
  const { elementsByIndex, labelSubmitButton } = elementStore;
  return (
    <Segment>
      <Form>
        {elementsByIndex.map((elem) => (
          <ElementView element={elem} key={elem.id} />
        ))}
        <Form.Button>{labelSubmitButton} </Form.Button>
      </Form>
    </Segment>
  );
};

export default observer(FormView);
