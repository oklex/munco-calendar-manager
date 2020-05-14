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
import FlexInput, { IAcceptedInputTypes } from "../FlexInput/FlexInput";
import { matchOrgType } from "../../utils/MatchToType";
import FlexDate from "../FlexDate/FlexDate";
// import '../../styles/index.scss'

interface IOrgAddCardProps {
	refreshParent?: any;
}

interface IOrgAddCardState extends IOrganizationRequest {
	// short_name_warning: string | null;
	// full_name_warning: string | null;
	// organization_type_warning: string | null;
	// website_warning: string | null;
	// running_since_warning: string | null;
	api_error: string | null;
}

class OrgAddCard extends React.Component<IOrgAddCardProps, IOrgAddCardState> {
	state: IOrgAddCardState = {
		short_name: "",
		full_name: "",
		organization_type: IOrganizationType.studentProject,
		website: "",
		running_since: new Date(),
		// short_name_warning: null,
		// full_name_warning: null,
		// organization_type_warning: null,
		// website_warning: null,
		// running_since_warning: null,
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
					// short_name_warning: null,
					// full_name_warning: null,
					// organization_type_warning: null,
					// website_warning: null,
					// running_since_warning: null,
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

	// handleShortNameChange = (e: React.FormEvent<HTMLInputElement>) => {
	// 	if (!checkName(e.currentTarget.value)) {
	// 		this.setState({
	// 			short_name_warning: "name can't be empty or have special characters",
	// 		});
	// 	} else if (this.state.short_name_warning) {
	// 		this.setState({
	// 			short_name_warning: "",
	// 		});
	// 	}
	// 	this.setState({
	// 		short_name: e.currentTarget.value,
	// 	});
	// };
	// handleFullNameChange = (e: React.FormEvent<HTMLInputElement>) => {
	// 	if (!checkName(e.currentTarget.value)) {
	// 		this.setState({
	// 			full_name_warning: "name can't be empty or have special characters",
	// 		});
	// 	} else if (this.state.full_name_warning) {
	// 		this.setState({
	// 			full_name_warning: "",
	// 		});
	// 	}
	// 	this.setState({
	// 		full_name: e.currentTarget.value,
	// 	});
	// };
	handleOrgTypeChange = (value: string) => {
		try {
			let type: IOrganizationType = matchOrgType(value);
			this.setState({
				organization_type: type,
			});
			return "";
		} catch (err) {
			console.log(err);
			return "name can't be empty or have special characters";
		}
	};

	// handleWebsiteChange = (e: React.FormEvent<HTMLInputElement>) => {
	// 	if (!checkWebsite(e.currentTarget.value)) {
	// 		this.setState({
	// 			website_warning: "invalid website",
	// 		});
	// 	} else if (this.state.website_warning) {
	// 		this.setState({
	// 			website_warning: "",
	// 		});
	// 	}
	// 	this.setState({
	// 		website: e.currentTarget.value,
	// 	});
	// };
	// handleDateChange = (date: Date) => {
	// 	this.setState({
	// 		running_since: date,
	// 	});
	// };

	showForm = () => {
		return (
			<div>
				<div className="h3StyleDiv">
					<InputWrapper label="Short Name">
					<FlexInput
						onChange={() => {
							return "";
						}}
						placeholder=""
					></FlexInput></InputWrapper>
				</div>

				<div className="pStyleDiv">
					<InputWrapper label="Full Name">
					<FlexInput
						onChange={() => {
							return "";
						}}
						placeholder=""
					/></InputWrapper>
				</div>
				<div className="pStyleDiv">
					<InputWrapper label="Organization Type">
					<FlexInput
						type={IAcceptedInputTypes.organizationTypes}
						onChange={this.handleOrgTypeChange}
						placeholder={
							this.state.organization_type
								? this.state.organization_type
								: "select an organization"
						}
					/></InputWrapper>
				</div>
				<div className="pStyleDiv">
				<InputWrapper label="Website">
					<FlexInput
						onChange={() => {
							return "";
						}}
						placeholder=""
					></FlexInput></InputWrapper>
				</div>
				
				<div className="pStyleDiv">
				<InputWrapper label="Founded on">
					<FlexDate
						onChange={() => {
							return "";
						}}
						placeholder={new Date()}
					></FlexDate></InputWrapper>
				</div>
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
