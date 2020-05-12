import { IOrganizationRequest } from "../models/calendar";
import { checkName, checkOrganizationType, checkWebsite, checkValidDate } from "./CheckInput";


export let MapStateToOrgRequest = (body: any): IOrganizationRequest => {
    let orgReq: IOrganizationRequest = { }
    if (body.short_name && checkName(body.short_name))
			orgReq.short_name = body.short_name;
		if (body.full_name && checkName(body.full_name))
			orgReq.full_name = body.full_name;
		if (
			body.organization_type &&
			checkOrganizationType(body.organization_type)
		)
			orgReq.organization_type = body.organization_type;
		if (body.website && checkWebsite(body.website))
			orgReq.website = body.website;
		if (body.running_since && checkValidDate(body.running_since))
			orgReq.running_since = body.running_since;
    return orgReq
}