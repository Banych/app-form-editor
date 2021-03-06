import { observer } from "mobx-react-lite";
import React, { Fragment, SyntheticEvent, useEffect, useState } from "react";
import { useContext } from "react";
import {
  Button,
  ButtonGroup,
  Form,
  Grid,
  GridColumn,
  Icon,
  Modal,
  Segment,
  Select,
} from "semantic-ui-react";
import Element from "../Models/Element";
import EInput from "../Models/Input";
import ESelect from "../Models/Select";
import ElementStore from "../Store/ElementStore";
import { enumToArray, ETypes, InputTypes } from "../util";
import EditableInput from "./Editable/EInput/EditableInput";
import { toJS } from "mobx";
import cloneDeep from "lodash.clonedeep";
import { EOption } from "../Models/Option";
import ECheckbox from "../Models/Checkbox";

const ElementFormModal = () => {
  const elementStore = useContext(ElementStore);
  const {
    editingElement,
    editElementMode,
    clearEditingElement,
    setEditingElement,
    enableEditElementMode,
    disableEditElementMode,
    createNewOption,
    addNewOption,
    removeOption,
    editOptionProp,
  } = elementStore;

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.currentTarget.type !== "checkbox") {
      const { name, value } = e.currentTarget;
      if (editingElement)
        setEditingElement({ ...editingElement, [name]: value });
    } else if (
      e.currentTarget instanceof HTMLInputElement &&
      e.currentTarget.type === "checkbox"
    ) {
      const { name, checked } = e.currentTarget;
      if (editingElement)
        setEditingElement({ ...editingElement, [name]: checked });
    }
  };

  const handleSelectChange = (
    e: SyntheticEvent<HTMLElement>,
    value:
      | string
      | number
      | boolean
      | (string | number | boolean)[]
      | undefined,
    property: string
  ) => {
    if (editingElement)
      setEditingElement({ ...editingElement, [property]: value });
  };

  const handleSelectAddOption = (propName: string) => {
    if (editingElement)
      setEditingElement({
        ...editingElement,
        [propName]: [...(editingElement as ESelect).options, createNewOption()],
      });
  };

  const handleSelectRemoveOption = (propName: string, id: number) => {
    if (editingElement)
      setEditingElement({
        ...editingElement,
        [propName]: (editingElement as ESelect).options.filter(
          (x) => x.id !== id
        ),
      });
  };

  function handleOptionPropChange(
    option: EOption,
    input: ESelect,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.currentTarget;
    editOptionProp(option, input, name, value);
  }

  return (
    <Fragment>
      <Modal.Header>Edit element</Modal.Header>
      <Modal.Content scrolling>
        <Form>
          {editingElement?.hasOwnProperty("name") && (
            <Form.Field>
              <label>Name</label>
              <input
                name="name"
                defaultValue={editingElement?.name}
                onChange={handleValueChange}
              />
            </Form.Field>
          )}
          {editingElement?.hasOwnProperty("label") && (
            <Form.Field>
              <label>Label</label>
              <input
                name="label"
                defaultValue={editingElement?.label}
                onChange={handleValueChange}
              />
            </Form.Field>
          )}
          {editingElement?.hasOwnProperty("value") &&
          (editingElement.etype == ETypes.ECheckbox) ? (
            <Form.Field>
              <label>Default value</label>
              <input
                type="checkbox"
                name="value"
                defaultChecked={editingElement?.value}
                onChange={handleValueChange}
              />
            </Form.Field>
          ) : (
            <Form.Field>
              <label>Default value</label>
              <input
                name="value"
                defaultValue={editingElement?.value}
                onChange={handleValueChange}
              />
            </Form.Field>
          )}
          {editingElement?.hasOwnProperty("required") && (
            <Form.Field>
              <label>Required</label>
              <input
                type="checkbox"
                name="required"
                defaultChecked={editingElement?.required}
                onChange={handleValueChange}
              />
            </Form.Field>
          )}
          {editingElement?.hasOwnProperty("type") && (
            <Form.Field>
              <label>Type</label>
              <Select
                name="type"
                options={enumToArray(InputTypes)}
                defaultValue={(editingElement as EInput).type}
                onChange={(e, { value }) =>
                  handleSelectChange(e, value, "type")
                }
              />
            </Form.Field>
          )}
          {editingElement?.hasOwnProperty("placeholder") && (
            <Form.Field>
              <label>Placeholder</label>
              <input
                name="placeholder"
                defaultValue={(editingElement as EInput).placeholder}
                onChange={handleValueChange}
              />
            </Form.Field>
          )}
          {editingElement?.hasOwnProperty("options") && (
            <Form.Field>
              <label>
                Options - count: {(editingElement as ESelect).options.length}
              </label>
              {(editingElement as ESelect).options.length > 0 && (
                <Segment>
                  {(editingElement as ESelect).options.map((opt) => (
                    <Grid key={opt.id}>
                      <GridColumn width={7}>
                        <label>Key</label>
                        <input
                          name="name"
                          defaultValue={opt.name}
                          onChange={(e) =>
                            handleOptionPropChange(
                              opt,
                              editingElement as ESelect,
                              e
                            )
                          }
                        />
                      </GridColumn>
                      <Grid.Column width={7}>
                        <label>Value</label>
                        <input
                          name="value"
                          defaultValue={opt.value}
                          onChange={(e) =>
                            handleOptionPropChange(
                              opt,
                              editingElement as ESelect,
                              e
                            )
                          }
                        />
                      </Grid.Column>
                      <Grid.Column width={2} style={{ float: "right" }}>
                        <Button
                          icon="remove"
                          style={{ marginTop: "20px" }}
                          onClick={() =>
                            handleSelectRemoveOption("options", opt.id)
                          }
                        />
                      </Grid.Column>
                    </Grid>
                  ))}
                </Segment>
              )}
              <Button onClick={() => handleSelectAddOption("options")}>
                Add option
              </Button>
            </Form.Field>
          )}
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => disableEditElementMode()}>Close</Button>
      </Modal.Actions>
    </Fragment>
  );
};

export default observer(ElementFormModal);
