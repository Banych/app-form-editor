import { useContext } from "react";
import { Fragment } from "react";
import { Button, ButtonGroup, Container, Grid, Menu } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import FormEditorDesk from "./FormEditorDesk";
import FormEditorToolBox from "./FormEditorToolBox";
import ElementStore from "../Store/ElementStore";
import { ReactComponent as Logo2 } from "../Assets/logo2.svg";

import "semantic-ui-css/semantic.min.css";
import FormView from "./FormView";

const FormEditor = () => {
  const elementStore = useContext(ElementStore);
  const { editFormMode, enableEditMode, disableEditMode } = elementStore;

  return (
    <Fragment>
      <Menu fixed="top" fluid>
        <Container>
          <Menu.Item active>
            <a href="/">
              <div style={{ width: "190px" }}>
                {/* <img src={logo2} alt="Logo Form Edit" /> */}
                <Logo2 fill="blue" />
              </div>
            </a>
          </Menu.Item>
          <Menu.Item>
            <ButtonGroup compact>
              <Button secondary={editFormMode} onClick={enableEditMode}>
                Editor
              </Button>
              <Button secondary={!editFormMode} onClick={disableEditMode}>
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
