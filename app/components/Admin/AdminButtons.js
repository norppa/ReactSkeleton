import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineFileAdd, AiOutlineLogout } from 'react-icons/ai'

import { useGlobalState } from "../../State";

const AdminButtons = (props) => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useGlobalState('admin')

    const onClickLogout = () => {
        localStorage.removeItem('@VLK_credentials')
        setCredentials(false)
        navigate('/')
    }

    if (!credentials) return null
    return (
        <div className='Buttons AdminButtons'>
            <AiOutlineFileAdd className='Button' onClick={navigate.bind(this, '/admin/new')} />
            <AiOutlineLogout className='Button' onClick={onClickLogout} />
        </div>
    )
}

export default AdminButtons