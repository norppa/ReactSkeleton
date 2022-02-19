import classNames from 'classnames'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGlobalState } from '../State'
import { Scrollbars } from 'react-custom-scrollbars-2'

const SongList = () => {

    const [songs, setSongs] = useGlobalState('songs')
    const [search, setSearch] = useGlobalState('search')
    const { pathname } = useLocation()

    const classes = {
        'SongList': true,
        'hideInSlim': pathname !== '/'
    }

    return (
        <div className={classNames(classes)}>
            <Scrollbars>
                <ul>
                    {songs
                        .filter(song => song.title.toLowerCase().includes(search.toLowerCase()))
                        .map(song => <li key={song.id}>
                            <Link key={song.id} to={song.number.toString()}>{song.number}. {song.title}</Link>
                        </li>)
                    }
                </ul>
            </Scrollbars>
        </div>

    )
}


export default SongList