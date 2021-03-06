import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { useContext } from "react";
import { Button, Form, Header, Input, List } from "semantic-ui-react";
import ElementStore from "../Store/ElementStore";

const FormEditorToolBox = () => {
  const elementStore = useContext(ElementStore);
  const {
    addNewElement,
    labelSubmitButton,
    setLabelSubmitButton,
  } = elementStore;
  return (
    <Fragment>
      <Header size="large">Toolbox</Header>
      <List>
        <List.Item>
          <Button
            secondary
            fluid
            onClick={() => addNewElement("input")}
            style={{ marginBottom: "1em" }}
          >
            Add input
          </Button>
          <Button
            secondary
            fluid
            onClick={() => addNewElement("select")}
            style={{ marginBottom: "1em" }}
          >
            Add select
          </Button>
          <Button
            secondary
            fluid
            onClick={() => addNewElement("checkbox")}
            style={{ marginBottom: "1em" }}
          >
            Add checkbox
          </Button>
          <Form>
            <Form.Field>
              <label>Submit button's label</label>
              <input
                defaultValue={labelSubmitButton}
                onChange={(e) => setLabelSubmitButton(e.target.value)}
              />
            </Form.Field>
          </Form>
        </List.Item>
      </List>
    </Fragment>
  );
};

export default observer(FormEditorToolBox);
