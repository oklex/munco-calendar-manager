import React from "react";
import AppEditCard from "../../components/applicationCards/appEditCard";
import OrgEditCard from "../../components/OrganizationCards/orgEditCard";
import "./EditorPanel.scss";
import { IOrganization, ICalendarResponse } from "../../models/calendar";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { CalendarService } from "../../services/OrganizationServices";

interface MatchParams {
  website_key: string;
}

interface IEditorPanelState {
  data: ICalendarResponse[];
  apiWarning: string | null;
  loading: boolean
}

class EditorPanel extends React.Component<
  RouteComponentProps<MatchParams>,
  IEditorPanelState
> {
  state = {
    data: [],
    apiWarning: null,
    loading: true
  };

  componentDidMount = async () => {
    let key: string = this.props.match.params.website_key;
    await CalendarService.getSingleOrganizationData(
      key
    ).then((res) => {
      this.setState({
        data: res,
        loading: false
      })
      return res;
    }).catch((err) => {
      console.log(err)
      this.setState({
        apiWarning: "Problem connecting with database",
        loading: false
      })
    })
  };

  render() {
    return (
      <div className="editor container">
        <p className="miniText">Editor view for </p>
        <OrgEditCard />
        <AppEditCard />
      </div>
    );
  }
}

export default withRouter(EditorPanel);