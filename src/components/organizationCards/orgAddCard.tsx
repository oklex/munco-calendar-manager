import React from "react";
import { IOrganizationType, IOrganizationRequest } from "../../models/calendar";
import DatePicker from "react-datepicker";
import { InputWrapper } from "../InputWrapper/InputWrapper";
import { CalendarService } from "../../services/OrganizationServices";
import { MapStateToOrgRequest } from "../../utils/mapStateToObj";
import {
	checkName,
	checkOrganizationType,
	checkWebsite,
} from "../../utils/CheckInput";
import "./orgAddCard.scss";
import "react-datepicker/dist/react-datepicker.css"; // required
// import '../../styles/index.scss'

interface IOrgAddCardProps {
	refreshParent?: any;
}

interface IOrgAddCardState extends IOrganizationRequest {
	short_name_warning: string | null;
	full_name_warning: string | null;
	organization_type_warning: string | null;
	website_warning: string | null;
	running_since_warning: string | null;
	api_error: string | null;
}

class OrgAddCard extends React.Component<IOrgAddCardProps, IOrgAddCardState> {
	state: IOrgAddCardState = {
		short_name: "",
		full_name: "",
		organization_type: IOrganizationType.studentProject,
		website: "",
		running_since: new Date(),
		short_name_warning: null,
		full_name_warning: null,
		organization_type_warning: null,
		website_warning: null,
		running_since_warning: null,
		api_error: null,
	};

	submitRequest = async () => {
		// use state to POST /organizations/new
		await CalendarService.postNewOrganization(MapStateToOrgRequest(this.state))
			.then(() => {
				this.setState({
					short_name: "",
					full_name: "",
					organization_type: IOrganizationType.studentProject,
					website: "",
					running_since: new Date(),
					short_name_warning: null,
					full_name_warning: null,
					organization_type_warning: null,
					website_warning: null,
					running_since_warning: null,
				});
				this.props.refreshParent();
			})
			.catch((err) => {
				this.setState({
					api_error: "Error submitting data",
				});
				console.log("error: ", err, this.state);
			});
	};

	handleShortNameChange = (e: React.FormEvent<HTMLInputElement>) => {
		if (!checkName(e.currentTarget.value)) {
			this.setState({
				short_name_warning: "name can't be empty or have special characters",
			});
		} else if (this.state.short_name_warning) {
			this.setState({
				short_name_warning: "",
			});
		}
		this.setState({
			short_name: e.currentTarget.value,
		});
	};
	handleFullNameChange = (e: React.FormEvent<HTMLInputElement>) => {
		if (!checkName(e.currentTarget.value)) {
			this.setState({
				full_name_warning: "name can't be empty or have special characters",
			});
		} else if (this.state.full_name_warning) {
			this.setState({
				full_name_warning: "",
			});
		}
		this.setState({
			full_name: e.currentTarget.value,
		});
	};
	handleOrgTypeChange = (type: IOrganizationType) => {
		if (!checkOrganizationType(type)) {
			this.setState({
				organization_type_warning:
					"name can't be empty or have special characters",
			});
		} else if (this.state.organization_type_warning) {
			this.setState({
				organization_type_warning: "",
			});
		}
		this.setState({
			organization_type: type,
		});
	};
	trueIfSelected = (type: IOrganizationType) => {
		if (type === this.state.organization_type) return true;
		else return false;
	};

	handleWebsiteChange = (e: React.FormEvent<HTMLInputElement>) => {
		if (!checkWebsite(e.currentTarget.value)) {
			this.setState({
				website_warning: "invalid website",
			});
		} else if (this.state.website_warning) {
			this.setState({
				website_warning: "",
			});
		}
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
				<InputWrapper
					title="short name"
					warning={this.state.short_name_warning}
				>
					<input
						type="text"
						placeholder="short name"
						value={this.state.short_name}
						onChange={this.handleShortNameChange}
					/>
				</InputWrapper>
				<InputWrapper title="full name" warning={this.state.full_name_warning}>
					<input
						type="text"
						placeholder="full name"
						value={this.state.full_name}
						onChange={this.handleFullNameChange}
					/>
				</InputWrapper>
				<InputWrapper
					title="Organization type"
					warning={this.state.organization_type_warning}
				>
					<div>
						<input
							type="radio"
							id={IOrganizationType.nonProfit}
							name="organization_type"
							onSelect={() =>
								this.handleOrgTypeChange(IOrganizationType.nonProfit)
							}
						/>
						<label htmlFor={IOrganizationType.nonProfit}>
							Registered Non-profit
						</label>
						<br />
						<input
							type="radio"
							id={IOrganizationType.schoolSponsored}
							name="organization_type"
							onSelect={() =>
								this.handleOrgTypeChange(IOrganizationType.schoolSponsored)
							}
						/>
						<label htmlFor={IOrganizationType.schoolSponsored}>
							School sponsored
						</label>
						<br />
						<input
							type="radio"
							id={IOrganizationType.studentProject}
							name="organization_type"
							onSelect={() =>
								this.handleOrgTypeChange(IOrganizationType.studentProject)
							}
						/>
						<label htmlFor={IOrganizationType.studentProject}>
							Student Project / other
						</label>
						<br />
					</div>
				</InputWrapper>
				<InputWrapper title="website" warning={this.state.website_warning}>
					<input
						type="text"
						placeholder="website url"
						value={this.state.website}
						onChange={this.handleWebsiteChange}
					/>
				</InputWrapper>
				<InputWrapper
					title="Founding date"
					subtitle="(month/day/year)"
					warning={this.state.running_since_warning}
				>
					<DatePicker
						onChange={this.handleDateChange}
						selected={this.state.running_since}
					/>
				</InputWrapper>
				<button
					type="button"
					className="btn btn-secondary"
					onClick={() => this.submitRequest()}
				>
					List new Organization
				</button>
				<p className="miniText errorText">{this.state.api_error}</p>
			</div>
		);
	};

	render() {
		return (
			<div className="orgAddCard">
				<h1>Add an organization</h1>
				{this.showForm()}
			</div>
		);
	}
}

export default OrgAddCard;
