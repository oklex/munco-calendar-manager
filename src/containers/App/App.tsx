import React from "react";
import "./App.scss";
import EditorPanel from "../EditorPanel/EditorPanel";
import OrganizationList from "../OrganizationLIst/OrganizationList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthSubmit from "../../components/AuthSubmission/AuthSubmit";

class App extends React.Component<{}, {}> {
  showOrgList = () => {
    return <OrganizationList />;
  };

  showEditor = () => {
    return <EditorPanel/>
  }

  show404 = () => {
    return <div>Error 404</div>
  }

  render() {
    return (
      <Router>
        <div className="App">
          <meta name="robots" content="noindex" />
          <Switch>
            <Route exact path="/" component={this.showOrgList} />
            <Route exact path="/:website_key" component={this.showEditor} />
            <Route component={this.show404}/>
          </Switch>
          <AuthSubmit/>
        </div>
      </Router>
    );
  }
}

export default App;
