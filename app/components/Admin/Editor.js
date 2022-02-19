import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalState } from "../../State";

import { createSong, updateSong, deleteSongs } from '../../api'

const Editor = () => {

    const params = useParams()
    const navigate = useNavigate()
    const [songs, setSongs] = useGlobalState('songs')
    const [credentials, setCredentials] = useGlobalState('admin')
    const [title, setTitle] = useState('')
    const [lyrics, setLyrics] = useState('')
    const [id, setId] = useState('')
    const [isUntouched, setIsUntouched] = useState(true)
    const [isNewSong, setIsNewSong] = useState(false)

    useEffect(() => {
        if (params.songNumber === 'new') {
            setTitle('')
            setLyrics('')
            setIsNewSong(true)
        } else {
            const song = songs.find(song => song.number == params.songNumber)
            if (!song) {
                navigate('/admin')
            } else {
                setTitle(song.title)
                setLyrics(song.lyrics)
                setId(song.id)
            }

        }

    }, [params])

    const remove = () => {
        const deletions = [songs.find(song => song.id === id)]
        deleteSongs(deletions, credentials).then(response => {
            if (response.status === 200) {
                setSongs(songs.filter(song => song.id !== id).map((song, i) => ({ ...song, number: i + 1 })))
                navigate('/admin')
            } else {
                console.error('Something went wrong in the server when trying to delete songs.')
            }
        })
    }

    const save = () => isNewSong ? callCreateSong() : callUpdateSong()

    const callCreateSong = () => createSong(title, lyrics, credentials)
        .then(response => {
            if (response.status !== 200) return console.error('Something went wrong in the server when trying to create the song.')
            return response.json()
        })
        .then(newSong => {
            const newSongs = songs
                .concat(newSong)
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((song, i) => ({ ...song, number: i + 1 }))
            const newSongNumber = newSongs.find(song => song.id === newSong.id).number
            setSongs(newSongs)
            setIsUntouched(true)
            setIsNewSong(false)
            navigate('/admin/' + newSongNumber)
        })

    const callUpdateSong = () => updateSong(id, title, lyrics, credentials).then(response => {
        if (response.status === 200) {
            setIsUntouched(true)
            setSongs(songs.map(song => {
                if (song.id !== id) return song
                return { ...song, title, lyrics }
            }))
        } else {
            console.error('Something went wrong in the server when trying to update the song.')
        }
    })

    const onChange = (setter) => (event) => {
        setIsUntouched(false)
        setter(event.target.value)
    }

    return <div className='Song Editor'>

        <label htmlFor="songtitle">Kappaleen nimi:</label>
        <input type="text" id="songtitle" value={title} onChange={onChange(setTitle)} />
        <label htmlFor="songlyrics">Kappaleen sanat:</label>
        <textarea id="songlyrics" value={lyrics} onChange={onChange(setLyrics)} />
        <div className="Buttons">
            <button onClick={save} disabled={isUntouched || !title || !lyrics}>Tallenna</button>
            {isNewSong
                ? <button onClick={navigate.bind(this, '/admin')}>Peruuta</button>
                : <button onClick={remove}>Poista</button>}

        </div>
    </div>

}

export default Editor