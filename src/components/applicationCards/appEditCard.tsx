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
import { checkName, checkWebsite } from "../../utils/CheckInput";
import { matchAppType } from "../../utils/MatchAppType";

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
			console.log(this.state);
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
		console.log(this.state);
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
			console.log(this.state);
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
				<div className="barOptions d-flex justify-content-between">
					<button onClick={this.reset}>reset</button>
					<button onClick={() => this.submitPatch()}> Patch </button>
				</div>
			);
		} else {
			return <p className="miniText">no changes recorded</p>;
		}
	};

	render() {
		return (
			<CardWrapper key={this.props.appData.application_key}>
				<div className="applicationCard">
					<h3>
						<FlexInput
							placeholder={this.props.appData.name}
							onChange={this.onChangeName}
							refresh={this.state.refresh}
						/>
					</h3>

					<p>
						<FlexInput
							type={IAcceptedInputTypes.applicationTypes}
							placeholder={this.props.appData.type}
							onChange={this.onChangeType}
							refresh={this.state.refresh}
						></FlexInput>
					</p>
					<p>
						Open: {this.props.appData.start_date} {" - "}
						{this.props.appData.end_date}
					</p>
					<p>
						<FlexInput
							placeholder={this.props.appData.applicationLink}
							onChange={this.onChangeLink}
							refresh={this.state.refresh}
						/>
					</p>
					<p className="errorText miniText">{this.state.apiWarning}</p>
					<br />
					{this.showPatchButton()}
				</div>
			</CardWrapper>
		);
	}
}
