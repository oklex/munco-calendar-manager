import React from "react";
import { IApplication, IApplicationRequest } from "../../models/calendar";
import { CardWrapper } from "../CardWrapper/CardWrapper";
import './appEditCard.scss'
import FlexInput from "../FlexInput/FlexInput";

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

  onChangeName = (value: string) => {
    this.setState({
      name: value
    })
    console.log(this.state)
    return ""
  }

  onChangeLink = (value:string) => {
    this.setState({
      applicationLink: value
    })
    console.log(this.state)
    return ""
  }

  render() {
    return (
      <CardWrapper key={this.props.appData.application_key}>
        <div className="applicationCard">
          <h3><FlexInput placeholder={this.props.appData.name} onChange={this.onChangeName}/></h3>
          <p>{this.props.appData.type} Applications</p>
          <p>
            Open: {this.props.appData.start_date} {" - "}
            {this.props.appData.end_date}
          </p>
          <p>Apply at: <FlexInput placeholder={this.props.appData.applicationLink} onChange={this.onChangeLink}/></p>
          <p className="errorText miniText">{this.state.apiWarning}</p>
        </div>
      </CardWrapper>
    );
  }
}
