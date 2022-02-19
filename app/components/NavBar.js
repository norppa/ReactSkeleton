import React from 'react'
import { useGlobalState } from '../State'
import { useLocation, useNavigate } from 'react-router-dom'

import { BiShuffle } from 'react-icons/bi'
import { IoMdFastforward, IoMdRewind } from 'react-icons/io'

import AdminButtons from './Admin/AdminButtons'

const NavBar = (props) => {
    const [search, setSearch] = useGlobalState('search')
    const [songs, setSongs] = useGlobalState('songs')
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onFocus = () => window.innerWidth < 600 && navigate('/')

    const getSongNumber = () => {
        if (pathname === '/' || pathname === '/admin') return 0
        return Number(pathname.replace('/admin', '').substring(1))
    }

    const goToPrevious = () => {
        const current = getSongNumber()
        if (current > 1) navigate(`${current - 1}`)
    }

    const goToNext = () => {
        const current = getSongNumber()
        console.log(current)
        if (current < songs.length) navigate(`${current + 1}`)
    }

    const goToRandom = () => {
        const random = songs[Math.floor(Math.random() * songs.length)].number
        navigate(random.toString())
    }


    return (
        <div className='NavBar'>
            <div className='margin' />
            <input className='Search'
                type='text'
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onFocus={onFocus}

            />
            <div className='Buttons'>
                <IoMdRewind className='Button' onClick={goToPrevious} />
                <BiShuffle className='Button' onClick={goToRandom} />
                <IoMdFastforward className='Button' onClick={goToNext} />
            </div>

            <AdminButtons />
            <div className='margin' />
        </div>
    )
}

export default NavBar