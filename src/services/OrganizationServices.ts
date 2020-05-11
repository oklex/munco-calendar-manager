import { IOrganization } from "../models/calendar";
import { calendarAPI } from "./constants";

export const CalendarService = {
    async getAllOrganizations(): Promise<IOrganization[]> {
        const { data } = await calendarAPI.get("/organizations/all")
        return data
    }
}