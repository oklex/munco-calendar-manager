import React from "react";
import "./FlexInput.scss";
import { IApplicationType, IOrganizationType } from "../../models/calendar";
import { matchAppType } from "../../utils/MatchToType";

interface IFlexInputProps {
  placeholder: string;
  onChange: (val: string) => string;
  refresh?: number;
  type?: IAcceptedInputTypes;
}

export enum IAcceptedInputTypes {
  text = "text",
  applicationTypes = "applicationTypes",
  organizationTypes = "organizationTypes",
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

  onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      value: e.currentTarget.value,
      errorMessage: this.props.onChange(e.currentTarget.value),
    });
  };

  onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    let value: string = e.target.value;
    this.setState({
      value: e.currentTarget.value,
      errorMessage: this.props.onChange(value),
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
            onChange={this.onInputChange}
            onKeyDown={this.onKeyDown}
            onBlur={this.toggleInputOff}
          />
        </div>
      );
    } else if (this.props.type === "applicationTypes") {
      return (
        <div onBlur={this.toggleInputOff}>
          <select
            autoFocus
            value={this.state.value}
            onChange={this.onSelectChange}
            onKeyDown={this.onKeyDown}
            onBlur={this.toggleInputOff}
          >
            <option value={IApplicationType.Staff}>Staff</option>
            <option value={IApplicationType.Delegate}>Delegate</option>
            <option value={IApplicationType.Secretariat}>Secretariat</option>
            <option value={IApplicationType.School}>School</option>
            <option value={IApplicationType.Volunteer}>Volunteer</option>
            <option value={IApplicationType.Other}>Other</option>
          </select>
        </div>
      );
    } else if (this.props.type === "organizationTypes") {
      return (
        <div onBlur={this.toggleInputOff}>
          <select
            autoFocus
            value={this.state.value}
            onChange={this.onSelectChange}
            onKeyDown={this.onKeyDown}
            onBlur={this.toggleInputOff}
          >
            <option value={IOrganizationType.nonProfit}>Staff</option>
            <option value={IOrganizationType.schoolSponsored}>Delegate</option>
            <option value={IOrganizationType.studentProject}>Secretariat</option>
          </select>
        </div>
      );
    }
  };

  showDisplay = () => {
    if (this.state.showInput) {
      return this.showInput();
    } else {
      return (
        <div className="flexInput" onClick={this.toggleInputOn}>
          {this.state.value ? this.state.value : <p className='neutralText'>input here</p>}
        </div>
      );
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
