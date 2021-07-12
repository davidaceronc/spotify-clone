import { useState, useEffect } from 'react';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL

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

    useEffect(() => {
        if ( !refreshToken || !expiresIn ) return
        // @ts-ignore
        const timer = ( expiresIn - 60 ) * 1000
        const interval = setInterval(() => {
            axios.post(`${SERVER_URL}/refresh`, {
                refreshToken
            }).then( res=> {
                setAccessToken(res.data.accessToken)
                setExpiresIn(res.data.expiresIn)
            }).catch(() => {
                window.location.href = '/'
            })
        }, timer)
        return () => clearInterval(interval)
    }, [refreshToken, expiresIn]);
    return accessToken
}
