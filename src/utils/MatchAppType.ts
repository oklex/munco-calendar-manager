import { IApplicationType } from "../models/calendar"

export let matchAppType = (value: string) => {
    if (IApplicationType.Delegate === value) return IApplicationType.Delegate
    else if (IApplicationType.School === value) return IApplicationType.School
    else if (IApplicationType.Secretariat === value) return IApplicationType.Secretariat
    else if (IApplicationType.Staff === value) return IApplicationType.Staff
    else if (IApplicationType.Volunteer === value) return IApplicationType.Volunteer
    else if (IApplicationType.Other === value) return IApplicationType.Other
    else throw Error("now an Application type")
}

// shouod refactor later