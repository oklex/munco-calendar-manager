import React from "react";
import {
  IOrganizationRequest,
  IOrganization,
  IOrganizationType,
} from "../../models/calendar";
import { InputWrapper } from "../InputWrapper/InputWrapper";
import FlexInput from "../FlexInput/FlexInput";

// props: the organization object
interface IOrgEditCardProps {
  orgData: IOrganization;
}

interface IOrgEditCardState {
  patchObj: IOrganizationRequest;
  refresh: number;
}

export default class OrgEditCard extends React.Component<
  IOrgEditCardProps,
  IOrgEditCardState
> {
  state = {
    patchObj: {},
    refresh: 0,
  };

  patchRequest = () => {
    // submit patch by website_key
  };

  reset = () => {
    this.setState({
      patchObj: {},
      refresh: this.state.refresh + 1,
    });
  };

  onShortNameChange = (value: string) => {
    let newPatch: IOrganizationRequest = this.state.patchObj;
    newPatch.short_name = value;
    this.setState({
      patchObj: newPatch,
    });
    return "";
  };

  onFullNameChange = (value: string) => {
    let newPatch: IOrganizationRequest = this.state.patchObj;
    newPatch.full_name = value;
    this.setState({
      patchObj: newPatch,
    });
    return "";
  };

  onWebsiteChange = (value: string) => {
    let newPatch: IOrganizationRequest = this.state.patchObj;
    newPatch.website = value;
    this.setState({
      patchObj: newPatch,
    });
    return "";
  };

  onTypeChange = (value: string) => {
    //map to type
    let type: IOrganizationType = IOrganizationType.studentProject;

    let newPatch: IOrganizationRequest = this.state.patchObj;
    newPatch.organization_type = type;
    this.setState({
      patchObj: newPatch,
    });
    return "";
  };

  onDateChange = (newDate: Date) => {
    let newPatch: IOrganizationRequest = this.state.patchObj;
    newPatch.running_since = newDate;
    this.setState({
      patchObj: newPatch,
    });
    return "";
  };

  render() {
    return (
      <div className="orgEditCard">
        <div className="pStyleDiv">
          <InputWrapper label="Short Name">
            <FlexInput
              placeholder={this.props.orgData.short_name}
              onChange={this.onShortNameChange}
              refresh={this.state.refresh}
            ></FlexInput>
          </InputWrapper>
          
          <InputWrapper label="Full Name">
            <FlexInput
              placeholder={this.props.orgData.full_name}
              onChange={this.onFullNameChange}
              refresh={this.state.refresh}
            ></FlexInput>
          </InputWrapper>
        </div>
      </div>
    );
  }
}
