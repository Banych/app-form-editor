import { observer } from "mobx-react-lite";
import React from "react";
import "./App.css";
import FormEditor from "./Components/FormEditor";

function App() {
  return <FormEditor />;
}

export default observer(App);
