import React from "react";

interface IFlexDateProps {
	placeholder: Date;
	onChange: (val: Date) => string;
	refresh?: number;
}

interface IFlexDateState {
	value: Date;
	errorMessage: string;
	showInput: boolean;
}

class FlexDate extends React.Component<IFlexDateProps, IFlexDateState> {
	state = {
		value: new Date(),
		errorMessage: "",
		showInput: false,
	};

	componentDidMount = () => {
		this.setState({
			value: this.props.placeholder,
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
			errorMessage: this.props.onChange(newDate),
		});
    };
    
	onKeyDown = (e: any) => {
		if (e.key === "Enter") {
			this.toggleInputOff();
		}
	};

	render() {
		return <div>prototype date picker</div>;
	}
}

export default FlexDate;
