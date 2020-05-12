import React from "react";
import "./CardWrapper.scss";

interface ICardWrapperProps {
	children: JSX.Element | JSX.Element[];
	onClick?: any
}

export class CardWrapper extends React.Component<ICardWrapperProps> {
	render() {
		return (
			<div onClick={this.props.onClick? this.props.onClick : () => {}}>
				<div className="cardWrapper col-md-4">{this.props.children}</div>
				<p className="miniText errorText">
				</p>
			</div>
		);
	}
}
