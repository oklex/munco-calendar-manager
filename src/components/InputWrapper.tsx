import React from "react";

interface IInputWrapperProps {
  title: string;
  warning: string | null;
  children: JSX.Element;
}

export class InputWrapper extends React.Component<IInputWrapperProps> {
  render() {
    return (
      <div>
          <p><strong>{this.props.title}</strong></p>
        {this.props.children}
        <p>{this.props.warning ? this.props.warning : ""}</p>
      </div>
    );
  }
}
