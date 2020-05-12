import React from "react";
import Modal from "react-modal";
import { IOrganization } from "../../models/calendar";
import { CalendarService } from "../../services/OrganizationServices";
import "./OrganizationList.scss";
import { Link, Redirect } from "react-router-dom";
import OrgAddCard from "../../components/OrganizationCards/orgAddCard";
import { CardWrapper } from "../../components/CardWrapper/CardWrapper";

interface IOrganizationListState {
	list: IOrganization[];
	filteredList: IOrganization[];
	filterInput: string;
	apiErrorMessage: string | null;
	loading: boolean;
	showAddModal: boolean;
	redirect: boolean
}

Modal.setAppElement("#root");

export default class OrganizationList extends React.Component<
	{},
	IOrganizationListState
> {
	state = {
		list: [],
		filteredList: [],
		filterInput: "",
		apiErrorMessage: null,
		loading: true,
		showAddModal: false,
		redirect: false
	};

	componentDidMount = async () => {
		await this.getOrgList();
	};

	getOrgList = async () => {
		await CalendarService.getAllOrganizations()
			.then((res) => {
				this.setState({
					list: res,
					filteredList: res,
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
	};
	toggleModalOff = (e?: any) => {
		this.setState({
			showAddModal: false,
		});
	};

	showAllOrganizations = () => {
		return this.state.filteredList.map((org) => {
			return this.showSingleOrganization(org);
		});
	};

	showSingleOrganization = (org: IOrganization) => {
		return (
			<Link to={"/edit/" + org.website_key} key={org.website_key}>
				<CardWrapper>
					<p>{org.short_name}</p>
					<p className="miniText">{org.full_name}</p>
				</CardWrapper>
			</Link>
		);
	};

	showFilterSelection = () => {
		return (
			<div id="largeTextInput">
				<input
					className="mainInput"
					type="text"
					onChange={this.onInputChange}
					value={this.state.filterInput}
					onKeyDown={this.onKeyDown}
				/>
				<span id="enterNext"></span>
			</div>
		);
	};

	onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
		this.setState({
			filterInput: e.currentTarget.value,
		});
		this.updateFilteredList();
	};

	onKeyDown = (e: any) => {
		if ((e.key === "Enter") && this.state.filterInput.length > 0) {
			this.setState({
				redirect: true
			})
		} else if (e.key === "Escape" || e.keyCode === 27) {
			this.setState({
				filterInput: ""
			})
		}
	};

	showRedirect = () => {
		if (this.state.redirect && this.state.filterInput.length > 0) {
			let firstOrg: IOrganization = this.state.filteredList[0]
			return <Redirect push to={"/edit/" + firstOrg.website_key}/>
		}
	}

	updateFilteredList = async () => {
		let compareBy: string = this.state.filterInput.toUpperCase();
		let newList: IOrganization[] = [];
		if (compareBy === "") {
			this.setState({
				filteredList: this.state.list,
			});
		} else {
			await Promise.all(
				this.state.list.map((org: IOrganization) => {
					let fullName: string = org.full_name.toUpperCase();
					let shortName: string = org.short_name.toUpperCase();
					if (shortName.includes(compareBy) || fullName.includes(compareBy)) {
						newList.push(org);
					}
					return 0
				})
			).then((res) => {
				this.setState({
					filteredList: newList,
				});
				console.log(this.state.filterInput, this.state.filteredList);
			});
		}
	};

	render() {
		return (
			<div className="container" id="organizationList">
				<h1>Select an Organization</h1>
				<p className="miniText errorText">{this.state.apiErrorMessage}</p>
				{this.showFilterSelection()}
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
				{this.showRedirect()}
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
