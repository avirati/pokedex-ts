import * as React from "react";
import "../node_modules/materialize-css/dist/css/materialize.css";
import "./App.css";

import { FooterComponent, HeaderComponent } from "./core/Components";

class App extends React.Component {
  public render() {
    return (
      <div className="container-fluid pokedex-app">
        <HeaderComponent />
        <FooterComponent />
      </div>
    );
  }
}

export default App;
