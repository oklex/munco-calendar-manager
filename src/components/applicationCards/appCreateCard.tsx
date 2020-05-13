import React from "react";
import { IApplicationRequest } from "../../models/calendar";

interface IAppCreateCardProps {
  website_key: string;
}

interface IAppEditCardState {
  patchObj: IApplicationRequest;
  apiWarning: string;
  edited: boolean;
  refresh: number; // iterate when you want to refresh children
}

class AppCreateCard extends React.Component<
  IAppCreateCardProps,
  IAppEditCardState
> {
  /* 
this class creates a new app at the specified org
*/

  state = {
    patchObj: {
      website_key: this.props.website_key,
    },
    apiWarning: "",
    edited: false,
    refresh: 0,
  };

  render() {
    return <div></div>;
  }
}
