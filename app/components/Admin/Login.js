import React, { useState, useParams } from "react";

import { login } from '../../api'

const Login = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [staylogged, setStaylogged] = useState(true)
    const [error, setError] = useState('')

    const submitOnEnter = (event) => event.key === 'Enter' && submit()

    const submit = () => {
        login(username, password)
            .then(response => {
                if (response.status === 401) {
                    setError('Virheellinen käyttäjätunnus tai salasana')
                } else if (response.status === 200) {
                    props.setCredentials({ username, password })
                    if (staylogged) {
                        localStorage.setItem('@VLK_credentials', JSON.stringify({ username, password }))
                    }
                } else {
                    setError('Jotain mystistä meni pieleen. Kaikki on menetetty :(')
                }
            })
    }

    return <div className='Login'>
        <div className='LoginBox'>
            <h1>Kirjaudu</h1>

            <div>
                <input type='text'
                    value={username}
                    placeholder='Käyttäjätunnus'
                    onChange={(event) => setUsername(event.target.value)}
                    onKeyPress={submitOnEnter}
                    autoFocus />
            </div>
            <div>
                <input type='text'
                    value={password}
                    placeholder='Salasana'
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyPress={submitOnEnter}
                    autoComplete="off" />
            </div>

            <div>
                <input type='checkbox' id='staylogged' checked={staylogged} onChange={setStaylogged.bind(this, !staylogged)} />
                <label htmlFor='staylogged'>Pysy kirjautuneena</label>
            </div>

            {error && <div>{error}</div>}
            <button onClick={submit} disabled={!username || !password}>Kirjaudu</button>

        </div>
    </div>
}

export default Login