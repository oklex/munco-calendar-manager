import {
	IOrganizationType,
	IApplicationType,
} from "../models/calendar";
import moment from "moment";

export let checkName = (name: string): boolean => {
	if (name) {
		let regex: RegExp = new RegExp(/^[a-zA-Z\s]*$/);
		return (regex.test(name))
	} else {
		return false;
	}
};


export let checkWebsite = (websiteRaw: string): boolean => {
	let website: string = websiteRaw.trim()
	if (website.includes(' ')) {
		return false
	} else {
		return true;
	}
};

export let checkOrganizationType = async (org: string) => {
	let returnVal: boolean = false;
	await Promise.all(
		Object.keys(IOrganizationType).map(async (obj: string) => {
			if (obj === org || (<any>IOrganizationType)[obj] === org) { // eslint-disable-next-line
				returnVal = true;
			}
		})
	).catch((err) => {
		// console.log("website is invalid: ", org);
		throw Error(err);
	});
	return returnVal;
};

export let checkApplicationType = async (app: string) => {
	let returnVal: boolean = false;
	await Promise.all(
		Object.keys(IApplicationType).map(async (obj: string) => {
			if (obj === app || (<any>IApplicationType)[obj] === app) { // eslint-disable-next-line
				returnVal = true;
			}
		})
	).catch((err) => {
		// console.log("app type is invalid: ", app);
		throw Error(err);
	});
	return returnVal;
};

export let checkValidDate = (date: string) => {
	let checkDate: number = Date.parse(date);
	if (checkDate) return true;
	else {
		// console.log("date is invalid: ", date);
		// throw Error("date is invalid: " + date)
		return false;
	}
};

export let CheckDateOrder = (start: Date, end: Date) => {
	console.log(start, end)
	let confirmOrder: boolean = moment(start).isBefore(end)
	// console.log(confirmOrder)
	return confirmOrder
}
