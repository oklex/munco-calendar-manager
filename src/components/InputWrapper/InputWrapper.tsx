import React from "react";
import './InputWrapper.scss'

interface IInputWrapperProps {
  title: string;
  subtitle?: string;
  warning: string | null;
  children: JSX.Element;
}

export class InputWrapper extends React.Component<IInputWrapperProps> {
  render() {
    return (
      <div className='inputWrapper'>
          <p>{this.props.title}</p>
          <p className='miniText'>{this.props.subtitle? this.props.subtitle : ""}</p>
        {this.props.children}
        <p className='miniText errorText'>{this.props.warning ? this.props.warning : ""}</p>
      </div>
    );
  }
}
