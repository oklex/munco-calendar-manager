import React from "react";
import "./App.scss";
import EditorPanel from "../EditorPanel/EditorPanel";
import OrganizationList from "../OrganizationLIst/OrganizationList";

class App extends React.Component<{},{}> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <OrganizationList/>
          <EditorPanel/>
        </header>
      </div>
    );
  }
}

export default App;
