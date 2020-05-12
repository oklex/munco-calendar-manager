import React from "react";
import AppEditCard from "../../components/applicationCards/appEditCard";
import OrgEditCard from "../../components/OrganizationCards/orgEditCard";
import "./EditorPanel.scss";
import { IOrganization } from "../../models/calendar";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface MatchParams {
  website_key: string
}

class EditorPanel extends React.Component<RouteComponentProps<MatchParams>> {

  componentDidMount = () => {
    let key: string =this.props.match.params.website_key
    console.log(key)
    this.setState({
        website_key: key
    })
  };

  render() {
    return (
      <div className="editor container">
        <p className="miniText">Editor view for ...</p>
        <OrgEditCard />
        <AppEditCard />
      </div>
    );
  }
}

export default withRouter(EditorPanel)