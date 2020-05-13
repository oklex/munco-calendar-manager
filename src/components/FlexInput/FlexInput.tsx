import React from "react";
import "./FlexInput.scss";
import { IApplicationType } from "../../models/calendar";

interface IFlexInputProps {
	placeholder: string;
	onChange: (val: string) => string;
	refresh?: number;
	type?: IAcceptedInputTypes;
}

export enum IAcceptedInputTypes {
	text = "text",
	applicationTypes = "applicationTypes",
	checkbox = "checkbox",
}

interface IFlexInputState {
	value: string;
	errorMessage: string;
	showInput: boolean;
}

class FlexInput extends React.Component<IFlexInputProps, IFlexInputState> {
	state = {
		value: "",
		errorMessage: "",
		showInput: false,
	};

	componentDidMount = () => {
		this.setState({
			value: this.props.placeholder,
		});
	};

	componentDidUpdate = (
		prevProps: IFlexInputProps,
		prevState: IFlexInputState
	) => {
		if (prevProps.refresh !== this.props.refresh) {
			this.setState({
				value: this.props.placeholder,
				errorMessage: "",
				showInput: false,
			});
		}
	};

	toggleInputOn = (e: any) => {
		this.setState({
			showInput: true,
		});
	};

	toggleInputOff = (e?: any) => {
		this.setState({
			showInput: false,
		});
	};

	onChange = (e: React.FormEvent<HTMLInputElement>) => {
		this.setState({
			value: e.currentTarget.value,
			errorMessage: this.props.onChange(e.currentTarget.value),
		});
	};

	onKeyDown = (e: any) => {
		if (e.key === "Enter") {
			this.toggleInputOff();
		}
	};

	showInput = () => {
		if (!this.props.type || this.props.type === "text") {
			return (
				<div onBlur={this.toggleInputOff}>
					<input
						autoFocus
						type="text"
						value={this.state.value}
						onChange={this.onChange}
						onKeyDown={this.onKeyDown}
						onBlur={this.toggleInputOff}
					/>
				</div>
			);
		} else if (this.props.type === "applicationTypes") {
			return (
				<div onBlur={this.toggleInputOff}>
					<select autoFocus>
						<option value={IApplicationType.Staff}>Staff</option>
						<option value={IApplicationType.Delegate}>Delegate</option>
						<option value={IApplicationType.Secretariat}>Secretariat</option>
						<option value={IApplicationType.School}>School</option>
						<option value={IApplicationType.Volunteer}>Delegate</option>
						<option value={IApplicationType.Other}>Other</option>
					</select>
				</div>
			);
		}
	};

	showDisplay = () => {
		if (this.state.showInput) {
			return this.showInput();
		} else {
			return <div onClick={this.toggleInputOn}>{this.state.value}</div>;
		}
	};

	render() {
		return (
			<div>
				{this.showDisplay()}
				<p className="miniText errorText">{this.state.errorMessage}</p>
			</div>
		);
	}
}

export default FlexInput;
