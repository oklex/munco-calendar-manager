import React from "react";
import {
  IOrganization,
  IOrganizationType,
  IOrganizationRequest,
} from "../../models/calendar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IOrgAddCardState extends IOrganizationRequest {}

class OrgAddCard extends React.Component<{}, IOrgAddCardState> {
  state: IOrgAddCardState = {
    short_name: "",
    full_name: "",
    organization_type: IOrganizationType.studentProject,
    website: "",
    running_since: new Date(),
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
        <input
          type="text"
          placeholder="short name"
          value={this.state.short_name}
          onChange={this.handleShortNameChange}
        />
        <br />
        <input
          type="text"
          placeholder="full name"
          value={this.state.full_name}
          onChange={this.handleFullNameChange}
        />
        <br />
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
