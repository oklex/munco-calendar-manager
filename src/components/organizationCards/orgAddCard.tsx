import React from "react";
import {
  IOrganization,
  IOrganizationType,
  IOrganizationRequest,
} from "../../models/calendar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InputWrapper } from "../InputWrapper";

interface IOrgAddCardState extends IOrganizationRequest {
  short_name_warning: string | null,
  full_name_warning: string | null,
  organization_type_warning: string | null,
  website_warning: string | null,
  running_since_warning: string | null
}

class OrgAddCard extends React.Component<{}, IOrgAddCardState> {
  state: IOrgAddCardState = {
    short_name: "",
    full_name: "",
    organization_type: IOrganizationType.studentProject,
    website: "",
    running_since: new Date(),
    short_name_warning: null,
    full_name_warning:  null,
    organization_type_warning: null,
    website_warning: null,
    running_since_warning: null
  };

  submitRequest = () => {
    // use state to POST /organizations/new
  };

  handleShortNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      short_name: e.currentTarget.value,
    });
  };
  handleFullNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      short_name: e.currentTarget.value,
    });
  };
  handleOrgTypeChange = (e: React.FormEvent<HTMLInputElement>) => {
    // check to see if it's a valid type
    this.setState({
      organization_type: e.currentTarget.value,
    });
  };
  handleWebsiteChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      website: e.currentTarget.value,
    });
  };
  handleDateChange = (date: Date) => {
    this.setState({
      running_since: date,
    });
  };

  showForm = () => {
    return (
      <div>
        <InputWrapper title="short name" warning={this.state.short_name_warning}><input
          type="text"
          placeholder="short name"
          value={this.state.short_name}
          onChange={this.handleShortNameChange}
        /></InputWrapper>
        <InputWrapper title="full name" warning={this.state.full_name_warning}>
        <input
          type="text"
          placeholder="full name"
          value={this.state.full_name}
          onChange={this.handleFullNameChange}
        /></InputWrapper>
        {/* <input type="radio" value={this.state.organization_type}/><br/> */}
        <input
          type="text"
          placeholder="website url"
          value={this.state.website}
          onChange={this.handleWebsiteChange}
        />
        <br />
        <DatePicker
          onChange={this.handleDateChange}
          selected={this.state.running_since}
        />
      </div>
    );
  };

  render() {
    return (
      <div>
        Add an organization
        {this.showForm()}
      </div>
    );
  }
}

export default OrgAddCard;
