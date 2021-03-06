import { useContext, useState } from "react";
import { Fragment } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  Menu,
  Radio,
  Segment,
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import Element from "../Models/Element";
import FormEditorDesk from "./FormEditorDesk";
import FormEditorToolBox from "./FormEditorToolBox";
import EInput from "../Models/Input";
import ElementStore from "../Store/ElementStore";

import "semantic-ui-css/semantic.min.css";
import FormView from "./FormView";

const FormEditor = () => {
  const elementStore = useContext(ElementStore);
  const { editFormMode, enableEditMode, disableEditMode } = elementStore;

  return (
    <Fragment>
      <Menu fixed="top" fluid>
        <Container>
          <Menu.Item active>Form editor</Menu.Item>
          <Menu.Item>
            <ButtonGroup compact>
              <Button primary={editFormMode} onClick={enableEditMode}>
                Editor
              </Button>
              <Button primary={!editFormMode} onClick={disableEditMode}>
                Preview
              </Button>
            </ButtonGroup>
          </Menu.Item>
        </Container>
      </Menu>
      <Container style={{ marginTop: "6em" }}>
        <Grid>
          {editFormMode ? (
            <Fragment>
              <Grid.Column computer={4} mobile={16}>
                <FormEditorToolBox />
              </Grid.Column>
              <Grid.Column computer={12} mobile={16}>
                <FormEditorDesk />
              </Grid.Column>
            </Fragment>
          ) : (
            <Fragment>
              <Grid.Column width={16}>
                <FormView />
              </Grid.Column>
            </Fragment>
          )}
        </Grid>
      </Container>
    </Fragment>
  );
};
export default observer(FormEditor);
