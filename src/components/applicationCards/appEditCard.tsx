import React from "react";
import { IApplication, IApplicationRequest } from "../../models/calendar";
import { CardWrapper } from "../CardWrapper/CardWrapper";
import './appEditCard.scss'

interface IAppEditCardProps {
  website_key: string;
  appData: IApplication;
}

interface IAppEditCardState extends IApplicationRequest {
  apiWarning: string;
}

export default class AppEditCard extends React.Component<
  IAppEditCardProps,
  IAppEditCardState
> {
  /* 
    state:
    - updated application information : IApplicationRequest

    functions:
    - onChange ; update state attribute that matches input name
    - save data ; patch by app id
    - show error ; if save fails show error
    - render ; show the card
    */

  state = {
    apiWarning: "",
  };

  submitPatch = () => {
    console.log("submit patch");
  };

  render() {
    return (
      <CardWrapper key={this.props.appData.application_key}>
        <div className="applicationCard">
          <h3>{this.props.appData.name}</h3>
          <p>{this.props.appData.type} Applications</p>
          <p>
            Open: {this.props.appData.start_date} {" - "}
            {this.props.appData.end_date}
          </p>
          <p>Apply at: {this.props.appData.applicationLink}</p>
          <p className="errorText miniText">{this.state.apiWarning}</p>
        </div>
      </CardWrapper>
    );
  }
}
