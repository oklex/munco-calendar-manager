import axios from 'axios'

const apiEndpoint = 'https://ancient-ravine-42785.herokuapp.com/api'
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