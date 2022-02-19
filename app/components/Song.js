import React from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useParams } from 'react-router-dom'
import { useGlobalState } from '../State'

const Song = () => {
    const params = useParams()
    const [songs, setSongs] = useGlobalState('songs')
    const song = songs.find(song => song.number == params.songNumber)

    if (!song) return null
    return <div className='Song'>
        <Scrollbars>
            <h1>{song.number}. {song.title}</h1>
            <p className='Lyrics'>{song.lyrics}</p>
        </Scrollbars>
    </div>
}


export default Song