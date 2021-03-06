import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { useContext } from "react";
import {
  Button,
  CardGroup,
  Form,
  Header,
  Icon,
  Modal,
  Segment,
} from "semantic-ui-react";
import ECheckbox from "../Models/Checkbox";
import Element from "../Models/Element";
import EInput from "../Models/Input";
import ESelect from "../Models/Select";
import ElementStore from "../Store/ElementStore";
import EditableCheckbox from "./Editable/EditableCheckbox";
import EditableInput from "./Editable/EInput/EditableInput";
import EditableSelect from "./Editable/EInput/EditableSelect";
import ElementFormModal from "./ElementFormModal";

const FormEditorDesk = () => {
  const elementStore = useContext(ElementStore);
  const {
    elementsByIndex,
    setEditingElement,
    editElementMode,
    disableEditElementMode,
    removeElement,
  } = elementStore;

  const handleCloseModal = () => {
    disableEditElementMode();
  };

  return (
    <Fragment>
      <Header size="large">Editor</Header>
      {elementsByIndex &&
        elementsByIndex.map((elem) => {
          elem = toJS(elem);
          return (
            <Segment clearing key={elem.id}>
              <Header
                size="medium"
                floated="left"
                style={{ verticalAlign: "middle", marginBottom: "0" }}
              >
                {elem.name}
              </Header>
              <div style={{ float: "right" }}>
                <Button icon onClick={() => setEditingElement(toJS(elem))}>
                  <Icon name="pencil" />
                </Button>
                <Button icon="delete" onClick={() => removeElement(elem.id)} />
              </div>
            </Segment>
          );
        })}
      <Modal open={editElementMode} onClose={handleCloseModal}>
        <ElementFormModal />
      </Modal>
    </Fragment>
  );
};

export default observer(FormEditorDesk);
