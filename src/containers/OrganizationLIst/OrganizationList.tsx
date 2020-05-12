import React from "react";
import Modal from "react-modal";
import { IOrganization } from "../../models/calendar";
import { CalendarService } from "../../services/OrganizationServices";
import "./OrganizationList.scss";
import { Link } from "react-router-dom";
import OrgAddCard from "../../components/OrganizationCards/orgAddCard";
import { CardWrapper } from "../../components/CardWrapper/CardWrapper";

interface IOrganizationListState {
	list: IOrganization[];
	apiErrorMessage: string | null;
	loading: boolean;
	showAddModal: boolean;
}

Modal.setAppElement("#root");

export default class OrganizationList extends React.Component<
	{},
	IOrganizationListState
> {
	state = {
		list: [],
		apiErrorMessage: null,
		loading: true,
		showAddModal: false,
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

	toggleModalOn = (e?: any) => {
		this.setState({
			showAddModal: true,
		});
		console.log(this.state.showAddModal);
	};
	toggleModalOff = (e?: any) => {
		this.setState({
			showAddModal: false,
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
					<p>{org.short_name}</p>
					<p className="miniText">{org.full_name}</p>
				</CardWrapper>
			</Link>
		);
	};

	render() {
		return (
			<div className="container" id="organizationList">
				<h1>Select an Organization</h1>
				<p className="miniText errorText">{this.state.apiErrorMessage}</p>
				<div className="row">
					{this.showAllOrganizations()}
					<CardWrapper onClick={this.toggleModalOn}>
						<div>
							<p>add new organization</p>
						</div>
					</CardWrapper>
				</div>
				<Modal
					isOpen={this.state.showAddModal}
					onRequestClose={this.toggleModalOff}
					style={customModalStyles}
				>
					<button onClick={this.toggleModalOff}>close</button>
					<OrgAddCard
						refreshParent={() => {
							this.getOrgList();
							this.toggleModalOff();
						}}
					/>
				</Modal>
			</div>
		);
	}
}

const customModalStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		width: "auto",
		height: "auto",
	},
};