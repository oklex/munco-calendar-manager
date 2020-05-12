import React from "react";
import "./AuthSubmit.scss";
import { getToken } from "../../services/constants";

interface IAuthSubmitState {
	token: string;
	saved: boolean;
	showInput: boolean;
}

export default class AuthSubmit extends React.Component<{}, IAuthSubmitState> {
	state = {
		token: "",
		saved: false,
		showInput: false,
	};

	componentDidMount = () => {
		this.fetchToken();
	};

	fetchToken = () => {
		let token: string = getToken();
		this.setState({
			token,
		});
	};

	toggleInputDisplay = (show: boolean) => {
		this.setState({
			showInput: show,
		});
		console.log(this.state);
	};

	onTokenChange = (e: React.FormEvent<HTMLInputElement>) => {
		this.setState({
            token: e.currentTarget.value,
            saved: true
		});
	};

	onTokenSave = () => {
        localStorage.setItem("token",this.state.token);
        this.toggleInputDisplay(false)
	};

	showInput = () => {
		return (
			<div>
				<input
					type="text"
					placeholder="auth token"
					value={this.state.token}
					onChange={this.onTokenChange}
				/>
				<button onClick={() => this.onTokenSave()}>save</button>
			</div>
		);
	};

	showContents = () => {
		if (this.state.showInput) {
			return this.showInput();
		} else {
			return (
				<div onClick={() => this.toggleInputDisplay(true)}>
					{this.state.saved ? "authorized as admin" : "demo view only"}
				</div>
			);
		}
	};

	render() {
		return (
			<div className="authSubmit">
				{this.showContents()}
				{/* <button
					type="button"
					className=""
					onClick={() => this.toggleInputDisplay(this.state.showInput)}
				>
					{this.state.token ? "change authorization" : "change to admin"}
				</button> */}
			</div>
		);
	}
}
