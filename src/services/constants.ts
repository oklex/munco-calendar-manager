import axios from 'axios'

const apiEndpoint = 'https://calendar.munco.ca/api'
export let calendarAPI = createAPIInstance()

function createAPIInstance() {
    return axios.create({
        baseURL: apiEndpoint
    })
}