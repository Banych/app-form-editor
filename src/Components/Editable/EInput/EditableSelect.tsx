import React from "react";
import { useContext } from "react";
import { Segment, Header, Button, Icon } from "semantic-ui-react";
import ESelect from "../../../Models/Select";
import ElementStore from "../../../Store/ElementStore";

interface EditableProps {
  element: ESelect;
  index: number;
}

const EditableSelect: React.FC<EditableProps> = ({ element, index }) => {
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
        <Header.Subheader>
          Select - {element.label} - (options: {element.options.length})
        </Header.Subheader>
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

export default EditableSelect;
