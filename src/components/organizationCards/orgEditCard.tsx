import React from "react";
import {
  IOrganizationRequest,
  IOrganization,
  IOrganizationType,
} from "../../models/calendar";
import { InputWrapper } from "../InputWrapper/InputWrapper";
import FlexInput, { IAcceptedInputTypes } from "../FlexInput/FlexInput";
import FlexDate from "../FlexDate/FlexDate";
import { matchOrgType } from "../../utils/MatchToType";
import { CalendarService } from "../../services/OrganizationServices";

// props: the organization object
interface IOrgEditCardProps {
  orgData: IOrganization;
}

interface IOrgEditCardState {
  patchObj: IOrganizationRequest;
  refresh: number;
  apiError: string;
  edited: boolean;
}

export default class OrgEditCard extends React.Component<
  IOrgEditCardProps,
  IOrgEditCardState
> {
  state = {
    patchObj: {},
    refresh: 0,
    apiError: "",
    edited: false,
  };

  submitPatch = async () => {
    // submit patch by website_key
    await CalendarService.patchSingleOrganization(
      this.state.patchObj,
      this.props.orgData.website_key
    )
      .then((res) => {
        console.log("patch completed");
        this.setState({
          edited: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          apiError: "problem updating data",
        });
      });
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
      edited: true,
    });
    return "";
  };

  onFullNameChange = (value: string) => {
    let newPatch: IOrganizationRequest = this.state.patchObj;
    newPatch.full_name = value;
    this.setState({
      patchObj: newPatch,
      edited: true,
    });
    return "";
  };

  onWebsiteChange = (value: string) => {
    let newPatch: IOrganizationRequest = this.state.patchObj;
    newPatch.website = value;
    this.setState({
      patchObj: newPatch,
      edited: true,
    });
    return "";
  };

  onTypeChange = (value: string) => {
    //map to type
    try {
      let type: IOrganizationType = matchOrgType(value);

      let newPatch: IOrganizationRequest = this.state.patchObj;
      newPatch.organization_type = type;
      this.setState({
        patchObj: newPatch,
        edited: true,
      });
      return "";
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  onDateChange = (newDate: Date) => {
    let newPatch: IOrganizationRequest = this.state.patchObj;
    newPatch.running_since = newDate;
    this.setState({
      patchObj: newPatch,
      edited: true,
    });
    return "";
  };

  showPatchButton = () => {
    if (this.state.edited) {
      return (
        <button className="greenText" onClick={() => this.submitPatch()}>
          Patch
        </button>
      );
    } else {
      return <p className="miniText">no changes recorded</p>;
    }
  };

  render() {
    return (
      <div className="orgEditCard row">
        <div className="pStyleDiv col-md-4">
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

          <InputWrapper label="Organization Type">
            <FlexInput
              type={IAcceptedInputTypes.organizationTypes}
              onChange={this.onTypeChange}
              placeholder={this.props.orgData.organization_type}
            />
          </InputWrapper>

          <InputWrapper label="Founding date">
            <FlexDate
              placeholder={this.props.orgData.running_since}
              onChange={this.onDateChange}
              refresh={this.state.refresh}
            ></FlexDate>
          </InputWrapper>

          <InputWrapper label="Website">
            <FlexInput
              placeholder={this.props.orgData.website}
              onChange={this.onWebsiteChange}
              refresh={this.state.refresh}
            ></FlexInput>
          </InputWrapper>
          <div className="barOptions d-flex justify-content-between">
            <button onClick={this.reset}>
              <p className="miniText">reset</p>
            </button>
            <p className="errorText miniText">{this.state.apiError}</p>
            {this.showPatchButton()}
          </div>
        </div>
      </div>
    );
  }
}
