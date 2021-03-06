import React from "react";
import AppEditCard from "../../components/applicationCards/appEditCard";
import "./EditorPanel.scss";
import {
  IOrganization,
  IApplication,
  IEvent,
  IOrganizationType,
} from "../../models/calendar";
import { RouteComponentProps, withRouter, Link, Redirect } from "react-router-dom";
import { CalendarService } from "../../services/OrganizationServices";
import AppCreateCard from "../../components/applicationCards/appCreateCard";
import OrgEditCard from "../../components/OrganizationCards/orgEditCard";
import { calendarAPI } from "../../services/constants";

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
  deleted: boolean,
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
    deleted: false
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

  reloadData = async () => {
    await CalendarService.getSingleOrganizationData(this.state.website_key)
      .then((res) => {
        console.log(res);
        this.setState({
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

  delete = async () => {
	  await CalendarService.deleteSingleOrganization(this.state.website_key).then((res) => {
      console.log(res)
      this.setState({
        deleted: true
      })
    }).catch((err) => {
      console.log(err);
      this.setState({
        apiWarning: "could not delete"
      })
    })
  };

  showRedirect = () => {
    if (this.state.deleted) {
      return <Redirect to="/"/>
    } else {
      return <div/>
    }
  }

  showTitle = (org: IOrganization) => {
    return (
      <div className="">
        <div className="">
          <p className="miniText">Editor view for {org.full_name}</p>
          <div className="row justify-content-left">
            <h1>{org.short_name}</h1>
            <div className=" sideBtn">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-cog"></i>
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <p className="dropdown-item" onClick={this.delete}>
                  delete
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  showAllApps = (apps: IApplication[]) => {
    return apps.map((app) => {
      return (
        <AppEditCard
          appData={app}
          website_key={this.state.website_key}
          updateParent={this.reloadData}
          key={app.application_key}
        />
      );
    });
  };

  render() {
    if (this.state.loading || this.state.organization === null) {
      return (
        <div className="editor container">
          <Link to="/">
            <i className="fas">&#xf060;</i>
          </Link>
          <h3>Just a moment please...</h3>
          <p className="miniText errorText"> {this.state.apiWarning}</p>
        </div>
      );
    } else {
      return (
        <div className="row justify-content-end">
        {this.showRedirect()}
          <div className="mainContainer editor col-lg-10">
            <Link to="/">
              <i className="fas">&#xf060;</i>
            </Link>
            {this.showTitle(this.state.organization)}
            <OrgEditCard orgData={this.state.organization} />
            <br />
            <h2>Applications</h2>
            <div className="row">
              {this.showAllApps(this.state.applications)}
              <AppCreateCard
                website_key={this.state.website_key}
                updateParent={this.reloadData}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(EditorPanel);
