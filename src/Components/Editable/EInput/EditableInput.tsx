import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import {
  Accordion,
  Button,
  Card,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  Segment,
  Select,
} from "semantic-ui-react";
import Element from "../../../Models/Element";
import EInput from "../../../Models/Input";
import ElementStore from "../../../Store/ElementStore";
import { enumToArray, InputTypes } from "../../../util";

interface EditableProps {
  element: EInput;
  onInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const EditableInput = ({ element, onInputChange }: EditableProps) => {
  const elementStore = useContext(ElementStore);
  const { editingElement, setEditingElement } = elementStore;

  return (
    <Form>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Form.Field>
              <label>Name</label>
              <input
                name="name"
                defaultValue={element.value}
                onChange={onInputChange}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Form.Field>
              <label>Label</label>
              <input
                name="label"
                defaultValue={element.label}
                onChange={onInputChange}
              />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form.Field>
              <label>Required</label>
              <input
                name="required"
                type="checkbox"
                defaultChecked={element.required}
                onChange={onInputChange}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Form.Field>
              <label>Default value</label>
              <input
                name="value"
                defaultValue={element.value}
                onChange={onInputChange}
              />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form.Field>
              <label>Placeholder</label>
              <input
                name="placeholder"
                defaultValue={element.placeholder}
                onChange={onInputChange}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Form.Field
              label="Type"
              control={Select}
              options={enumToArray(InputTypes)}
              onChange={onInputChange}
            >
              {/* <label>Type</label>
              <Select
                name="type"
                defaultValue={element.type}
                options={enumToArray(InputTypes)}
                onChange={onInputChange}
              /> */}
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

export default observer(EditableInput);
