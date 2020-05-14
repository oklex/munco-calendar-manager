import React from "react";
import {
	IApplication,
	IApplicationRequest,
	IApplicationType,
} from "../../models/calendar";
import { CardWrapper } from "../CardWrapper/CardWrapper";
import "./appEditCard.scss";
import FlexInput, { IAcceptedInputTypes } from "../FlexInput/FlexInput";
import { CalendarService } from "../../services/OrganizationServices";
import {
	checkName,
	checkWebsite,
	CheckDateOrder,
} from "../../utils/CheckInput";
import { matchAppType } from "../../utils/MatchToType";
import FlexDate from "../FlexDate/FlexDate";
import { InputWrapper } from "../InputWrapper/InputWrapper";

interface IAppEditCardProps {
	website_key: string;
  appData: IApplication;
}

interface IAppEditCardState {
	patchObj: IApplicationRequest;
	apiWarning: string;
	edited: boolean;
	refresh: number; // iterate when you want to refresh children
}

export default class AppEditCard extends React.Component<
	IAppEditCardProps,
	IAppEditCardState
> {
	/* 
    state:
    - updated application information : IApplicationRequest

    functions:
    - onChange ; update state attribute that matches input name
    - save data ; patch by app id
    - show error ; if save fails show error
    - render ; show the card
    */

	state = {
		patchObj: {
			website_key: this.props.website_key,
		},
		apiWarning: "",
		edited: false,
		refresh: 0,
	};

	submitPatch = async () => {
		console.log("submit patch");
		await CalendarService.patchSingleApplication(
			this.props.appData.application_key,
			this.state.patchObj
		)
			.then((res) => {
				console.log("patch completed");
				this.setState({
					edited: false,
				});
			})
			.catch((err) => {
				console.log(err);
				this.setState({
					apiWarning: "problem updating data",
				});
			});
	};

	onChangeName = (value: string) => {
		if (!checkName(value)) {
			return "name can't be empty or have special characters";
		} else {
			let newPatchObj: IApplicationRequest = this.state.patchObj;
			newPatchObj.name = value;
			this.setState({
				patchObj: newPatchObj,
				edited: true,
			});
			return "";
		}
	};

	onChangeType = (value: string) => {
		let newPatchObj: IApplicationRequest = this.state.patchObj;
		newPatchObj.type = matchAppType(value);
		this.setState({
			patchObj: newPatchObj,
			edited: true,
		});
		return "";
	};

	onChangeLink = (value: string) => {
		if (!checkWebsite(value)) {
			return "invalid website";
		} else {
			let newPatchObj: IApplicationRequest = this.state.patchObj;
			newPatchObj.applicationLink = value;
			this.setState({
				patchObj: newPatchObj,
				edited: true,
			});
			return "";
		}
	};

	onChangeStartDate = (newDate: Date) => {
		let obj: IApplicationRequest = this.state.patchObj;
		let endDate: Date = obj.end_date ? obj.end_date : new Date();
		if (!CheckDateOrder(newDate, endDate)) {
			return "start date must be before end date";
		} else {
			let newPatchObj: IApplicationRequest = this.state.patchObj;
			newPatchObj.start_date = newDate;
			this.setState({
				patchObj: newPatchObj,
				edited: true,
			});
			return "";
		}
	};

	onChangeEndDate = (newDate: Date) => {
		let obj: IApplicationRequest = this.state.patchObj;
		let start: Date = obj.start_date ? obj.start_date : new Date();
		if (!CheckDateOrder(start, newDate)) {
			return "end date must come after start date";
		} else {
			let newPatchObj: IApplicationRequest = this.state.patchObj;
			newPatchObj.end_date = newDate;
			this.setState({
				patchObj: newPatchObj,
				edited: true,
			});
			return "";
		}
	};

	reset = (e?: any) => {
		let iteration: number = this.state.refresh + 1;
		this.setState({ refresh: iteration });
	};

	showPatchButton = () => {
		if (this.state.edited) {
			return (
				<button className="greenText" onClick={() => this.submitPatch()}>
					{" "}
					Patch{" "}
				</button>
			);
		} else {
			return <p className="miniText">no changes recorded</p>;
		}
	};

	render() {
		return (
			<CardWrapper key={this.props.appData.application_key}>
				<div className="applicationCard">
					<div className="h3StyleDiv">
						<InputWrapper label="name">
							<FlexInput
								placeholder={this.props.appData.name}
								onChange={this.onChangeName}
								refresh={this.state.refresh}
							/>
						</InputWrapper>
					</div>

					<div className="pStyleDiv">
						<InputWrapper label="application type">
							<FlexInput
								type={IAcceptedInputTypes.applicationTypes}
								placeholder={this.props.appData.type}
								onChange={this.onChangeType}
								refresh={this.state.refresh}
							></FlexInput>
						</InputWrapper>
					</div>
					<div className="pStyleDiv">
						<InputWrapper label="Start Date">
							<FlexDate
								onChange={this.onChangeStartDate}
								placeholder={this.props.appData.start_date}
								refresh={this.state.refresh}
							></FlexDate>
						</InputWrapper>
					</div>
					<div className="pStyleDiv">
						<InputWrapper label="End Date">
							<FlexDate
								onChange={this.onChangeEndDate}
								placeholder={this.props.appData.end_date}
								refresh={this.state.refresh}
							></FlexDate>
						</InputWrapper>
					</div>
					<div className="pStyleDiv">
						<InputWrapper label="application link">
							<FlexInput
								placeholder={this.props.appData.applicationLink}
								onChange={this.onChangeLink}
								refresh={this.state.refresh}
							/>
						</InputWrapper>
					</div>
					<br />

					<div className="barOptions d-flex justify-content-between">
						<button onClick={this.reset}>
							<p className="miniText">reset</p>
						</button>
						<p className="errorText miniText">{this.state.apiWarning}</p>
						{this.showPatchButton()}
					</div>
				</div>
			</CardWrapper>
		);
	}
}
