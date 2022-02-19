import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom'

import { setGlobalState } from './State'
import { getSongs } from './api'
import { basename } from './values'
import Admin from './components/Admin/Admin'
import Editor from './components/Admin/Editor'
import Song from './components/Song'
import SongList from './components/SongList'
import NavBar from './components/NavBar'

import './index.css'
import classNames from 'classnames'

const PageError = () => <div className='Error'>Tietokantaan ei juuri nyt saada yhteyttä :(</div>
const Page404 = () => <main style={{ padding: "1rem" }}><p>There's nothing here!</p></main>

const App = () => {

    const [phase, setPhase] = useState('LOADING')

    useEffect(() => {
        console.log('useEffect')
        getSongs().then(songs => {
            console.log('songs')
            if (songs.error) {
                setPhase('ERROR')
                console.error(result)
            } else {
                console.log('songs', songs)
                setGlobalState('songs', songs)
                setPhase('READY')
            }
        })
    }, [])

    if (phase === 'LOADING') return <div>Loading...</div>
    if (phase === 'ERROR') return <PageError />

    const FrontPage = () => {
        const { pathname } = useLocation()

        return (
            <div className={classNames({ 'FrontPage Song': true, 'hideInSlim': pathname.length === 1 })}>
                <h1>Lukkari</h1>
            </div>
        )
    }

    const SongBook = () => {
        const { pathname } = useLocation()

        return <div className='SongBook'>
            <NavBar />
            <SongList />
            <Outlet context={pathname} />
        </div>
    }

    return (
        <Router basename={basename}>
            <Routes>
                <Route path="/admin" element={<Admin />}>
                    <Route index element={<FrontPage />} />
                    <Route path=":songNumber" element={<Editor />} />
                </Route>
                <Route path="/" element={<SongBook />}>
                    <Route index element={<FrontPage />} />
                    <Route path=":songNumber" element={<Song />} />
                </Route>

                <Route path="*" element={<Page404 />} />
            </Routes>
        </Router>
    )

}

ReactDOM.render(<App />, document.getElementById('app'))