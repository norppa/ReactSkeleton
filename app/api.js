import { apiUrl } from './values'

export const use = (setter) => (event) => setter(event.target.value)

export const getSongs = async () => {
    console.log('apiURl', apiUrl)
    const result = await fetch(apiUrl)
    if (result.status !== 200) return { error: true }
    return (await result.json())
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((song, i) => ({ ...song, number: i + 1 }))
}


export const createSong = (title, lyrics, credentials) => {
    const options = requestOptions('POST', { title, lyrics }, credentials)
    return fetch(apiUrl, options)
}

export const updateSong = (id, title, lyrics, credentials) => {
    const url = apiUrl + '/' + id
    const options = requestOptions('PUT', { title, lyrics }, credentials)
    return fetch(url, options)
}

export const deleteSongs = (deletions, credentials) => {
    const options = requestOptions('DELETE', deletions, credentials)
    return fetch(apiUrl, options)
}

export const login = (username, password) => {
    const url = apiUrl + '/login'
    const options = requestOptions('GET', null, { username, password })
    return fetch(url, options)
}

const requestOptions = (method, bodyObject, credentials = null) => {
    const headers = new Headers()
    if (credentials) {
        headers.set('Authorization', 'Basic ' + window.btoa(credentials.username + ":" + credentials.password))
    }

    let body = undefined
    if (bodyObject) {
        body = JSON.stringify(bodyObject)
        headers.set('Content-Type', 'application/json')
    }

    return { method, headers, body }
}