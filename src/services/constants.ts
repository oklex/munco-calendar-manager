import axios from 'axios'

const apiEndpoint = 'http://calendar.munco.ca/api'
export let calendarAPI = createAPIInstance()

function createAPIInstance() {
    return axios.create({
        baseURL: apiEndpoint,
        headers: { authorization: getToken() }
    })
}

export function getToken() {
    return window.localStorage.authorization || ''
  }