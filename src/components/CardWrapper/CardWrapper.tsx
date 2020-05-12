import React from "react";
import "./CardWrapper.scss";

interface ICardWrapperProps {
	children: JSX.Element[];
}

export class CardWrapper extends React.Component<ICardWrapperProps> {
	render() {
		return (
			<div>
				<div className="cardWrapper col-md-4">{this.props.children}</div>
				<p className="miniText errorText">
				</p>
			</div>
		);
	}
}
