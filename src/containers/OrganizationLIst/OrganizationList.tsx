import React from "react";
import { IOrganization } from "../../models/calendar";
import { CalendarService } from "../../services/OrganizationServices";
import "./OrganizationList.scss";
import { Link } from "react-router-dom";
import OrgAddCard from "../../components/organizationCards/orgAddCard";

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
    await this.getOrgList()
  };

  getOrgList = async () => {
    let list: IOrganization[] = await CalendarService.getAllOrganizations();
    this.setState({
      list,
    });
  }

  addToList = (addNew: IOrganization) => {
    let newList: IOrganization[] = this.state.list
    newList.push(addNew)
    this.setState({
      list: newList
    })
  }

  showAllOrganizations = () => {
    return this.state.list.map((org) => {
      return this.showSingleOrganization(org);
    });
  };

  showSingleOrganization = (org: IOrganization) => {
    return (
      <Link to={"/" + org.website_key}>
        <div className="organizationSelect">
          <h3>{org.short_name}</h3>
          <p>{org.full_name}</p>
        </div>
      </Link>
    );
  };

  render() {
    return (
      <div className="organizationList container">
        Prototype OrganizationList
        {this.showAllOrganizations()}
        <OrgAddCard refreshParent={this.getOrgList}/>
      </div>
    );
  }
}
