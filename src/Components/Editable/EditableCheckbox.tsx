import React, { useContext } from "react";
import { Segment, Header, Button, Icon } from "semantic-ui-react";
import ECheckbox from "../../Models/Checkbox";
import ElementStore from "../../Store/ElementStore";

interface EditableProps {
  element: ECheckbox;
  index: number;
}

const EditableCheckbox: React.FC<EditableProps> = ({ element, index }) => {
  const elementStore = useContext(ElementStore);
  const { setEditingElement } = elementStore;

  return (
    <Segment clearing key={index}>
      <Header
        size="medium"
        floated="left"
        style={{ verticalAlign: "middle", marginBottom: "0" }}
      >
        {element.name}
        <Header.Subheader>Checkbox - {element.label}</Header.Subheader>
      </Header>
      <div style={{ float: "right" }}>
        <Button icon onClick={() => setEditingElement(element)}>
          <Icon name="pencil" />
        </Button>
        <Button icon="delete" />
      </div>
    </Segment>
  );
};

export default EditableCheckbox;
