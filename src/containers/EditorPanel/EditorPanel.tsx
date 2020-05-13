import React from "react";
import AppEditCard from "../../components/applicationCards/appEditCard";
import "./EditorPanel.scss";
import {
  IOrganization,
  ICalendarResponse,
  IApplication,
  IEvent,
  IOrganizationType,
} from "../../models/calendar";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { CalendarService } from "../../services/OrganizationServices";
import { CardWrapper } from "../../components/CardWrapper/CardWrapper";

interface MatchParams {
  website_key: string;
}

interface IEditorPanelState {
  website_key: string;
  apiWarning: string;
  loading: boolean;
  organization: IOrganization;
  applications: IApplication[] | null;
  events: IEvent[] | null;
}

class EditorPanel extends React.Component<
  RouteComponentProps<MatchParams>,
  IEditorPanelState
> {
  state = {
    website_key: "",
    apiWarning: "",
    loading: true,
    organization: {
      short_name: "",
      full_name: "",
      website_key: "",
      organization_type: IOrganizationType.studentProject,
      website: "",
      running_since: new Date(),
    },
    applications: [],
    events: [],
  };

  componentDidMount = async () => {
    let key: string = this.props.match.params.website_key;
    await CalendarService.getSingleOrganizationData(key)
      .then((res) => {
        console.log(res);
        this.setState({
          website_key: key,
          organization: res.organization,
          applications: res.applications,
          events: res.events,
          apiWarning: "",
          loading: false,
        });
        return res;
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          apiWarning: "Problem connecting with database",
          loading: false,
        });
      });
  };

  showTitle = (org: IOrganization) => {
    return (
      <div>
        <p className="miniText">Editor view for {org.full_name}</p>
        <h1>{org.short_name}</h1>
      </div>
    );
  };

  showAllApps = (apps: IApplication[]) => {
    return apps.map((app) => {
      return <AppEditCard appData={app} website_key={this.state.website_key} />;
    });
  };

  render() {
    if (this.state.organization === null) {
      return (
        <div className="editor container">
          <p>Just a moment please...</p>
          <p className="miniText errorText"> {this.state.apiWarning}</p>
        </div>
      );
    } else {
      return (
        <div className="editor container">
          {this.showTitle(this.state.organization)}
          <br />
          <h2>Applications</h2>
          <div className="row">
            {this.showAllApps(this.state.applications)}
            <CardWrapper>
              <div className='addButton'>
                <h1>+</h1>
                <p>List a new Application</p>
              </div>
            </CardWrapper>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(EditorPanel);
