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


export let checkWebsite = (website: string): boolean => {
	// check if it's unique (not on Firebase)
	// check whois
	if (website.includes(".")) {
		return true;
	} else {
		return false;
	}
};

export let checkOrganizationType = async (org: string) => {
	let returnVal: boolean = false;
	await Promise.all(
		Object.keys(IOrganizationType).map(async (obj: string) => {
			if (obj === org || (<any>IOrganizationType)[obj] === org) {
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
			if (obj === app || (<any>IApplicationType)[obj] === app) {
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
	console.log(confirmOrder)
	return confirmOrder
}
