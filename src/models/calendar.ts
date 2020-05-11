
// CC v2
export interface ICalendarResponse {
    organization: IOrganization,
    events: IConferenceEvent[] | null,
    applications: IApplicationEvent[] | null
  }
  
  export interface IOrganization {
    website_key: string;
    short_name: string;
    full_name: string;
    organization_type: string;
    website: string;
    running_since: Date
  }
  
  export enum IOrganizationType {
    nonProfit = "Registered non profit",
    schoolSponsored = "School Sponsored",
    studentProject = "Student Project"
  }
  
  export interface IConferenceEvent {
    venue_name: string;
    venue_city: string;
    start_date: Date;
    end_date: Date | null;
    dates_tentative: boolean
    tags: string[];
  }
  
  export interface IApplicationEvent {
    name: string
    type: IApplicationType
    start_date: Date
    end_date: Date
    dates_tentative: boolean
    applicationLink: string
    cost:number | null
  }
  
  export enum IApplicationType {
    Delegate = "Delegate Registration",
    School = "School Registration",
    Staff = "Staff Application",
    Secretariat = "Secretariat Application",
    Volunteer = "Volunteer Application",
    Other = "Other"
  }
  