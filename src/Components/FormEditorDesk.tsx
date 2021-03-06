import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { useContext } from "react";
import { Button, Header, Icon, Modal, Segment } from "semantic-ui-react";
import Element from "../Models/Element";
import EInput from "../Models/Input";
import ESelect from "../Models/Select";
import ElementStore from "../Store/ElementStore";
import { ETypes } from "../util";
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

  const displayInfoAboutElement = (element: Element) => {
    switch (element.etype) {
      case ETypes.ECheckbox:
        return (
          <Fragment>
            <Icon name="check square" />
            {`Value: ${element.value}`}
          </Fragment>
        );
      case ETypes.EInput:
        return (
          <Fragment>
            <Icon name="font" />
            {`Type: ${(element as EInput).type}, value: ${element.value}`}
          </Fragment>
        );
      case ETypes.ESelect:
        return (
          <Fragment>
            <Icon name="dropdown" />
            {`Value: ${element.value}, options: ${
              (element as ESelect).options.length
            }`}
          </Fragment>
        );
    }
  };

  return (
    <Fragment>
      <Header size="large">Editor</Header>
      {elementsByIndex && elementsByIndex.length ? (
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
                <Header.Subheader>
                  {displayInfoAboutElement(elem)}
                </Header.Subheader>
              </Header>
              <div style={{ float: "right" }}>
                <Button icon onClick={() => setEditingElement(toJS(elem))}>
                  <Icon name="pencil" />
                </Button>
                <Button icon="delete" onClick={() => removeElement(elem.id)} />
              </div>
            </Segment>
          );
        })
      ) : (
        <Header size="medium">
          To add element you should click on button in Toolbox
        </Header>
      )}
      <Modal open={editElementMode} onClose={handleCloseModal}>
        <ElementFormModal />
      </Modal>
    </Fragment>
  );
};

export default observer(FormEditorDesk);
