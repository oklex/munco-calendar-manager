import React from 'react'
import { IOrganization, IOrganizationType, IOrganizationRequest } from '../../models/calendar'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IOrgAddCardState extends IOrganizationRequest {}

class OrgAddCard extends React.Component<{},IOrgAddCardState> {
    state:IOrgAddCardState = {
        short_name: "short_name",
        full_name: "full_name",
        organization_type: IOrganizationType.studentProject,
        website: "test.com",
        running_since: new Date()
    }

    submitRequest = () => {
        // use state to POST /organizations/new
    }

    showForm = () => {
        return (<div>
            <input type="text" value={this.state.short_name}/><br/>
            <input type="text" value={this.state.full_name}/><br/>
            <input type="text" value={this.state.organization_type}/><br/>
            <input type="text" value={this.state.website}/><br/>
            <DatePicker
            onChange={() => {}}
        selected={this.state.running_since} />
        </div>)
    }

    render() {
        return (<div>
            Add an organization
            {this.showForm()}
        </div>)
    }
}

export default OrgAddCard