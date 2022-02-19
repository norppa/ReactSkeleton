import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import Login from './Login'
import SongList from '../SongList'
import NavBar from '../NavBar'

import { getSongs } from '../../api'
import { useGlobalState } from '../../State'

const Admin = () => {
    const [credentials, setCredentials] = useGlobalState('admin')
    const [songs, setSongs] = useGlobalState('songs')

    useEffect(() => {
        getSongs().then(songs => {
            if (songs.error) return console.error('Failed to get songs from the backend')
            setSongs(songs)
        })
        const credentials = JSON.parse(localStorage.getItem('@VLK_credentials'))
        if (credentials) setCredentials(credentials)
    }, [])

    if (!credentials) return <Login setCredentials={setCredentials} />
    if (!songs) return <div className='Error'>Virhetilanne :(</div>

    return (
        <div className='SongBook Admin'>
            <NavBar admin={true} />
            <SongList />
            <Outlet />
        </div>
    )
}

export default Admin