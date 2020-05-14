import React from "react";
import './InputWrapper.scss'

interface IInputWrapperProps {
  label: string;
  children: JSX.Element;
}

export class InputWrapper extends React.Component<IInputWrapperProps> {
  render() {
    return (
      <div className='inputWrapper'>
          <p className='miniText neutralText'>{this.props.label}</p>
          {/* <p className='miniText'>{this.props.subtitle? this.props.subtitle : ""}</p> */}
        {this.props.children}
        {/* <p className='miniText errorText'>{this.props.warning ? this.props.warning : ""}</p> */}
      </div>
    );
  }
}
