import { IOrganization } from "../models/calendar";
import { calendarAPI } from "./constants";

export const BlogService = {
    async getAllOrganizations(): Promise<IOrganization[]> {
        const { data } = await calendarAPI.get("/organizations/all")
        return data
    }
}