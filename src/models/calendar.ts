
// CC v2
export interface ICalendarResponse {
  organization: IOrganization,
  events: IEvent[] | null,
  applications: IApplication[] | null
}

export interface IOrganization {
  website_key: string;
  short_name: string;
  full_name: string;
  organization_type: string;
  website: string;
  running_since: Date
}

export interface IOrganizationRequest {
  short_name?: string;
  full_name?: string;
  organization_type?: string;
  website?: string;
  running_since?: Date
}

export enum IOrganizationType {
  nonProfit = "Registered non profit",
  schoolSponsored = "School Sponsored",
  studentProject = "Student Project"
}

export interface IEvent {
  venue_name: string;
  venue_city: string;
  start_date: Date;
  end_date: Date | null;
  dates_tentative: boolean
  tags: string[];
}

export interface IApplication {
  application_key: string
  name: string
  type: IApplicationType
  start_date: Date
  end_date: Date
  dates_tentative: boolean
  applicationLink: string
  cost: number | null
}

export interface IApplicationRequest {
  website_key?: string,
  name?: string;
  type?: IApplicationType;
  start_date?: Date;
  end_date?: Date;
  dates_tentative?: boolean;
  applicationLink?: string;
  cost?: number;
}

export enum IApplicationType {
  Delegate = "Delegate Registration",
  School = "School Registration",
  Staff = "Staff Application",
  Secretariat = "Secretariat Application",
  Volunteer = "Volunteer Application",
  Other = "Other"
}
