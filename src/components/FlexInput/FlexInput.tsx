import React from "react";
import "./FlexInput.scss";

interface IFlexInputProps {
	placeholder: string;
	onChange: (val: string) => string;
	refresh?: number;
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
		if (prevProps.refresh != this.props.refresh) {
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

	showDisplay = () => {
		if (this.state.showInput) {
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
