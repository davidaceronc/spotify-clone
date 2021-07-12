import { useState, useEffect } from 'react';
import axios from 'axios';

const SERVER_URL = `http://localhost:3001`

export default function UserAuth(code:string) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        axios.post(`${SERVER_URL}/login`, {
            code
        }).then( res=> {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
            window.history.pushState({}, '', '/')
        }).catch(() => {
            window.location.href = '/'
        })
    }, [code]);
    return accessToken
}
