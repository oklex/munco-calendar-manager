import React from "react";
import {
  IApplicationRequest,
  IApplication,
  IApplicationType,
} from "../../models/calendar";
import { CardWrapper } from "../CardWrapper/CardWrapper";
import FlexInput, { IAcceptedInputTypes } from "../FlexInput/FlexInput";
import FlexDate from "../FlexDate/FlexDate";
import {
  CheckDateOrder,
  checkWebsite,
  checkName,
} from "../../utils/CheckInput";
import { matchAppType } from "../../utils/MatchToType";
import { CalendarService } from "../../services/OrganizationServices";

interface IAppCreateCardProps {
  website_key: string;
}

interface IAppEditCardState {
  showEditor: boolean;
  postObj: IApplicationRequest;
  apiWarning: string;
  edited: boolean;
  refresh: number; // iterate when you want to refresh children
}

class AppCreateCard extends React.Component<
  IAppCreateCardProps,
  IAppEditCardState
> {
  state: IAppEditCardState = {
    showEditor: false,
    postObj: {
      name: "",
      type: IApplicationType.Other,
      start_date: new Date(),
      end_date: new Date(),
      dates_tentative: false,
      applicationLink: "",
      website_key: this.props.website_key,
    },
    apiWarning: "",
    edited: false,
    refresh: 0,
  };

  submitPost = async () => {
    console.log("submit post");
    await CalendarService.postSingleApplication(
      this.state.postObj
    )
      .then((res) => {
        console.log("post completed");
        this.setState({
          edited: false,
          apiWarning: ""
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          apiWarning: "problem updating data",
        });
      });
  };

  onChangeName = (value: string) => {
    if (!checkName(value)) {
      return "name can't be empty or have special characters";
    } else {
      let newPostObj: IApplicationRequest = this.state.postObj;
      newPostObj.name = value;
      this.setState({
        postObj: newPostObj,
        edited: true,
      });
      return "";
    }
  };
  onChangeType = (value: string) => {
    let newPostObj: IApplicationRequest = this.state.postObj;
    newPostObj.type = matchAppType(value);
    this.setState({
      postObj: newPostObj,
      edited: true,
    });
    return "";
  };
  onChangeLink = (value: string) => {
    if (!checkWebsite(value)) {
      return "invalid website";
    } else {
      let newPostObj: IApplicationRequest = this.state.postObj;
      newPostObj.applicationLink = value;
      this.setState({
        postObj: newPostObj,
        edited: true,
      });
      return "";
    }
  };
  onChangeStartDate = (newDate: Date) => {
    let obj: IApplicationRequest = this.state.postObj;
    let endDate: Date = obj.end_date ? obj.end_date : new Date();
    if (!CheckDateOrder(newDate, endDate)) {
      return "start date must be before end date";
    } else {
      let newPostObj: IApplicationRequest = this.state.postObj;
      newPostObj.start_date = newDate;
      this.setState({
        postObj: newPostObj,
        edited: true,
      });
      return "";
    }
  };
  onChangeEndDate = (newDate: Date) => {
    let obj: IApplicationRequest = this.state.postObj;
    let start: Date = obj.start_date ? obj.start_date : new Date();
    if (!CheckDateOrder(start, newDate)) {
      return "end date must come after start date";
    } else {
      let newPostObj: IApplicationRequest = this.state.postObj;
      newPostObj.end_date = newDate;
      this.setState({
        postObj: newPostObj,
        edited: true,
      });
      return "";
    }
  };

  reset = (e?: any) => {
    let iteration: number = this.state.refresh + 1;
    this.setState({ refresh: iteration });
  };

  showPatchButton = () => {
    if (this.state.edited) {
      return (
        <button className="greenText" onClick={() => this.submitPost()}>
          {" "}
          Create new{" "}
        </button>
      );
    } else {
      return <p className="miniText">must complete fields first</p>;
    }
  };

  showEditor = () => {
    if (this.state.showEditor) {
      return (
        <CardWrapper key={this.state.postObj.website_key}>
          <div className="applicationCard">
            <div className="h3StyleDiv">
              <FlexInput
                placeholder={""}
                onChange={this.onChangeName}
                refresh={this.state.refresh}
              />
            </div>

            <div className="pStyleDiv">
              <FlexInput
                type={IAcceptedInputTypes.applicationTypes}
                placeholder={IApplicationType.Other}
                onChange={this.onChangeType}
                refresh={this.state.refresh}
              ></FlexInput>
            </div>
            <div className="pStyleDiv">
              <span>Start date: </span>
              <FlexDate
                onChange={this.onChangeStartDate}
                placeholder={new Date()}
                refresh={this.state.refresh}
              ></FlexDate>
            </div>
            <div className="pStyleDiv">
              <span>End date: </span>
              <FlexDate
                onChange={this.onChangeEndDate}
                placeholder={new Date()}
                refresh={this.state.refresh}
              ></FlexDate>
            </div>
            <div className="pStyleDiv">
              <FlexInput
                placeholder={""}
                onChange={this.onChangeLink}
                refresh={this.state.refresh}
              />
            </div>
            <br />
            <div className="barOptions d-flex justify-content-between">
              <button onClick={this.reset}>
                <p className="miniText">reset</p>
              </button>
              <p className="errorText miniText">{this.state.apiWarning}</p>
              {this.showPatchButton()}
            </div>
          </div>
        </CardWrapper>
      );
    } else {
      return (
        <CardWrapper>
          <div
            className="addButton"
            onClick={() => {
              this.setState({ showEditor: true });
            }}
          >
            <h1>+</h1>
            <p>List a new Application</p>
          </div>
        </CardWrapper>
      );
    }
  };

  render() {
    return this.showEditor();
  }
}

export default AppCreateCard;
