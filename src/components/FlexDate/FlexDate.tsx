import React from "react";
import moment, { Moment } from "moment";
import DatePicker from "react-datepicker";
import "./FlexDate.scss";
import "react-datepicker/dist/react-datepicker.css"; // required

interface IFlexDateProps {
	placeholder: Date;
	onChange: (val: Date) => string;
	refresh?: number;
}

interface IFlexDateState {
	value: Date;
	displayDate: Moment;
	errorMessage: string;
	showInput: boolean;
}

class FlexDate extends React.Component<IFlexDateProps, IFlexDateState> {
	state: IFlexDateState = {
		value: new Date(),
		displayDate: moment(),
		errorMessage: "",
		showInput: false,
	};

	componentDidMount = () => {
		this.setState({
			value: new Date(this.props.placeholder),
			displayDate: moment(this.props.placeholder)
		});
	};

	componentDidUpdate = (
		prevProps: IFlexDateProps,
		prevState: IFlexDateState
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

	onInputChange = (newDate: Date) => {
		this.setState({
			value: newDate,
			displayDate: moment(newDate),
			errorMessage: this.props.onChange(newDate),
		});
        console.log(newDate);
        {this.toggleInputOff()}
	};

	onKeyDown = (e: any) => {
		if (e.key === "Enter") {
			this.toggleInputOff();
		}
	};

	showInput = () => {
		return (
			<div className="flexDate" /*onBlur={this.toggleInputOff}*/>
				<DatePicker
					autoFocus
					onChange={this.onInputChange}
					selected={this.state.value}
					onBlur={this.toggleInputOff}
				/>
			</div>
		);
	};

	showDisplay = () => {
		if (this.state.showInput) {
			return this.showInput();
		} else {
			return (
				<div className="flexDate" onClick={this.toggleInputOn}>
					{this.state.displayDate.format("MMMM/DD/YYYY")}
				</div>
			);
		}
	};

	render() {
		return <div className="inline">{this.showDisplay()}</div>;
	}
}

export default FlexDate;
