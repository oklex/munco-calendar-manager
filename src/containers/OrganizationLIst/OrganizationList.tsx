import React from "react";
import { IOrganization } from "../../models/calendar";
import { CalendarService } from "../../services/OrganizationServices";
import './OrganizationList.scss'

interface IOrganizationListState {
  list: IOrganization[];
}

export default class OrganizationList extends React.Component<
  {},
  IOrganizationListState
> {
  /* 
    ComponentDidMount : load in all data from calendar API (/api/organizations/:id?include=all)

    functions:
    - showOrganizationCard
    - showApplications
    - showSingleAppCard

    */
  state = {
    list: [],
  };

  componentDidMount = async () => {
    let list: IOrganization[] = await CalendarService.getAllOrganizations();
    this.setState({
      list,
    });
  };

  showAllOrganizations = () => {
      return this.state.list.map((org) => {
          return this.showSingleOrganization(org)
      })
  }

  showSingleOrganization = (org: IOrganization) => {
      return (<div className='organizationSelect'>
          <h3>{org.short_name}</h3>
          <p>{org.full_name}</p>
      </div>)
  }

  render() {
    return <div className='organizationList'>Prototype OrganizationList
        {this.showAllOrganizations()}
    </div>;
  }
}
