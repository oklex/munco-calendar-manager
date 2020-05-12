import { IOrganization, IOrganizationRequest, ICalendarResponse } from "../models/calendar";
import { calendarAPI } from "./constants";

export const CalendarService = {
	async getAllOrganizations(): Promise<IOrganization[]> {
		try {
			const { data } = await calendarAPI.get("/organizations/all");
			return data;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},

	async postNewOrganization(obj: IOrganizationRequest): Promise<string> {
		try {
			let response: string = await calendarAPI.post("/organizations/new", obj);
			return response;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},

	async getSingleOrganizationData(website_key: string): Promise<ICalendarResponse> {
		try {
			const { data } = await calendarAPI.get("/organizations/" + website_key + "?include=all")
			console.log(data)
			return data
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
};
