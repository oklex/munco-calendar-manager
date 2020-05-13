import React from "react";
import './FlexInput.scss'

interface IFlexInputProps {
  placeholder: string;
  onChange: (val: string) => string;
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
          value: this.props.placeholder
      })
  }

  toggleInputOn = (e: any) => {
    this.setState({
      showInput: true,
    });
  };

  toggleInputOff = (e?:any) => {
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
        <div>
          <input
            type="text"
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            onBlur={this.toggleInputOff}
          />
        </div>
      );
    } else {
      return (
        <div onClick={this.toggleInputOn}>
          <p>{this.state.value}</p>
        </div>
      );
    }
  };

  render() {
  return <div>{this.showDisplay()}</div>;
  }
}

export default FlexInput;
