import React from 'react'
import ApplicationCard from '../../components/applicationCard/applicationCard'
import OrganizationCard from '../../components/organizationCard/organizationCard'

export default class EditorPanel extends React.Component<{},{}> {
    render() {
        return (
            <div>EditorPanel prototypee
                <OrganizationCard/>
                <ApplicationCard/>
            </div>
        )
    }
}