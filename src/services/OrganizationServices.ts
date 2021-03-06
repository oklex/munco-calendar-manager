import {
	IOrganization,
	IOrganizationRequest,
	ICalendarResponse,
	IApplicationRequest,
} from "../models/calendar";
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
			console.log("post new org")
			let response: any = await calendarAPI.post("/organizations/new", obj).then((res) => { console.log(res); return res });
			console.log(response)
			return response;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},

	async patchSingleOrganization(obj: IOrganizationRequest, website_key: string): Promise<string> {
		try {
			let response: string = await calendarAPI.patch(("/organizations/" + website_key), obj)
			return response
		} catch (err) {
			console.log(err);
			throw err;
		}
	},

	async deleteSingleOrganization(website_key: string) {
		await calendarAPI.delete("/organizations/" + website_key).then((res) => { return res }).catch((err) => {
			console.log(err); throw err
		})
	},

	async getSingleOrganizationData(
		website_key: string
	): Promise<ICalendarResponse> {
		try {
			const { data } = await calendarAPI.get(
				"/organizations/" + website_key + "?include=all"
			);
			console.log(data);
			return data;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},

	async postSingleApplication(postObj: IApplicationRequest) {
		console.log(postObj);
		try {
			await calendarAPI.post("/applications/new", postObj);
		} catch (err) {
			console.log(err);
			throw err;
		}
	},

	async patchSingleApplication(
		application_key: string,
		patchObj: IApplicationRequest
	) {
		try {
			await calendarAPI.patch("/applications/" + application_key, patchObj);
		} catch (err) {
			console.log(err);
			throw err;
		}
	},

	async deleteSingleApplication(application_key: string, website_key: string) {
		try {
			await calendarAPI.delete("/applications/" + application_key, { data: { website_key } });
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
};
