import React from 'react'
import AppEditCard from '../../components/applicationCards/appEditCard'
import OrganizationCard from '../../components/organizationCards/orgEditCard'

export default class EditorPanel extends React.Component<{},{}> {
    render() {
        return (
            <div>EditorPanel prototypee
                <OrganizationCard/>
                <AppEditCard/>
            </div>
        )
    }
}