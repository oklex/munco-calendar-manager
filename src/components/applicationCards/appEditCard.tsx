import React from "react";
import { IApplication, IApplicationRequest } from "../../models/calendar";
import { CardWrapper } from "../CardWrapper/CardWrapper";
import './appEditCard.scss'
import FlexInput from "../FlexInput/FlexInput";
import { CalendarService } from "../../services/OrganizationServices";

interface IAppEditCardProps {
  website_key: string;
  appData: IApplication;
}

interface IAppEditCardState {
  patchObj: IApplicationRequest,
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
    patchObj: {
      website_key: this.props.website_key
    },
    apiWarning: "",
  };

  submitPatch = async () => {
    console.log("submit patch");
    await CalendarService.patchSingleApplication(this.props.appData.application_key, this.state.patchObj).then((res) => {
      console.log("patch completed")
    }).catch((err) => {
      console.log(err)
      this.setState({
        apiWarning: "problem updating data"
      })
    })
  };

  onChangeName = (value: string) => {
    let newPatchObj: IApplicationRequest = this.state.patchObj
    newPatchObj.name = value
    this.setState({
      patchObj: newPatchObj
    })
    console.log(this.state)
    return ""
  }

  onChangeLink = (value:string) => {
    let newPatchObj: IApplicationRequest = this.state.patchObj
    newPatchObj.applicationLink = value
    this.setState({
      patchObj: newPatchObj
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
          <p><FlexInput placeholder={this.props.appData.applicationLink} onChange={this.onChangeLink}/></p>
          <p className="errorText miniText">{this.state.apiWarning}</p>
        </div>
        <button onClick={() =>this.submitPatch()}>Patch</button>
      </CardWrapper>
    );
  }
}
