import React from "react";
import { IOrganization } from "../../models/calendar";
import { CalendarService } from "../../services/OrganizationServices";
import "./OrganizationList.scss";
import { Link } from "react-router-dom";
import OrgAddCard from "../../components/organizationCards/orgAddCard";
import { CardWrapper } from "../../components/CardWrapper/CardWrapper";

interface IOrganizationListState {
	list: IOrganization[];
	apiErrorMessage: string | null;
	loading: boolean;
}

export default class OrganizationList extends React.Component<
	{},
	IOrganizationListState
> {
	state = {
		list: [],
		apiErrorMessage: null,
		loading: true,
	};

	componentDidMount = async () => {
		await this.getOrgList();
	};

	getOrgList = async () => {
		await CalendarService.getAllOrganizations()
			.then((res) => {
				this.setState({
					list: res,
					loading: false,
					apiErrorMessage: null,
				});
			})
			.catch((err) => {
				this.setState({
					list: [],
					loading: false,
					apiErrorMessage: "Problem connecting to database",
				});
				return [];
			});
	};

	addToList = (addNew: IOrganization) => {
		let newList: IOrganization[] = this.state.list;
		newList.push(addNew);
		this.setState({
			list: newList,
		});
	};

	showAllOrganizations = () => {
		return this.state.list.map((org) => {
			return this.showSingleOrganization(org);
		});
	};

	showSingleOrganization = (org: IOrganization) => {
		return (
			<Link to={"/" + org.website_key} key={org.website_key}>
				<CardWrapper>
					<h3>{org.short_name}</h3>
					<p>{org.full_name}</p>
				</CardWrapper>
			</Link>
		);
	};

	render() {
		return (
			<div className="organizationList container">
				Prototype OrganizationList
				<p className="miniText errorText">{this.state.apiErrorMessage}</p>
				<div className="row">{this.showAllOrganizations()}</div>
				<OrgAddCard refreshParent={this.getOrgList} />
			</div>
		);
	}
}
