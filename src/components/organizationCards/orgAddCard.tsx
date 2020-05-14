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
	CheckDateOrder,
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
	api_error: string | null;
}

class OrgAddCard extends React.Component<IOrgAddCardProps, IOrgAddCardState> {
	state: IOrgAddCardState = {
		short_name: "",
		full_name: "",
		organization_type: IOrganizationType.studentProject,
		website: "",
		running_since: new Date(),
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

	handleShortNameChange = (value: string) => {
		if (checkName(value)) {
			this.setState({
				short_name: value,
			});
			return "";
		} else {
			return "name can't be empty or have special characters";
		}
	};
	handleFullNameChange = (value: string) => {
		if (checkName(value)) {
			this.setState({
				full_name: value,
			});
			return "";
		} else {
			return "name can't be empty or have special characters";
		}
	};
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

	handleWebsiteChange = (value: string) => {
		if (checkWebsite(value)) {
			this.setState({
				website: value,
			});
			return "";
		} else {
			return "invalid website";
		}
	};
	handleDateChange = (date: Date) => {
		if (CheckDateOrder(date, new Date())) {
			this.setState({
				running_since: date,
			});
			return "";
		} else {
			return "Date must be in the past";
		}
	};

	showForm = () => {
		return (
			<div>
				<div className="h3StyleDiv">
					<InputWrapper label="Short Name">
						<FlexInput
							onChange={this.handleShortNameChange}
							placeholder=""
						></FlexInput>
					</InputWrapper>
				</div>

				<div className="pStyleDiv">
					<InputWrapper label="Full Name">
						<FlexInput
							onChange={this.handleFullNameChange}
							placeholder=""
						/>
					</InputWrapper>
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
						/>
					</InputWrapper>
				</div>
				<div className="pStyleDiv">
					<InputWrapper label="Website">
						<FlexInput
							onChange={this.handleWebsiteChange}
							placeholder=""
						></FlexInput>
					</InputWrapper>
				</div>

				<div className="pStyleDiv">
					<InputWrapper label="Founded on">
						<FlexDate
							onChange={this.handleDateChange}
							placeholder={new Date()}
						></FlexDate>
					</InputWrapper>
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
