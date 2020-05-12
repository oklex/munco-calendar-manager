import React from 'react'
import AppEditCard from '../../components/applicationCards/appEditCard'
import OrgEditCard from '../../components/OrganizationCards/orgEditCard'

export default class EditorPanel extends React.Component<{},{}> {
    render() {
        return (
            <div>EditorPanel prototypee
                <OrgEditCard/>
                <AppEditCard/>
            </div>
        )
    }
}