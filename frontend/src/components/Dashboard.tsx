import { useState, useEffect } from 'react';
import { Container, Form } from "react-bootstrap"
import Song from "./Song";
import Player from "./Player";
import UserAuth from "../hooks/UserAuth";
import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER_URL

export default function Dashboard({code}: { code: string }) {
    const accessToken = UserAuth(code)
    const [search, setSearch] = useState("")
    const [songs, setSongs] = useState([])
    const [currentSong, setCurrentSong] = useState<any | undefined>(undefined)
    const [lyrics, setLyrics] = useState("")

    function playSong( song: any ) {
        setCurrentSong(song)
        setLyrics("")
    }

    useEffect( () => {
        if (!accessToken) return
        if (!search) return
        axios.post(`${SERVER_URL}/search`, {
            search, accessToken
        }).then( res=> {
            const { songs } = res.data;
            setSongs(songs);
        }).catch(() => {
        })
    }, [search]);

    useEffect( () => {
        if (!currentSong) return
        axios.post(`${SERVER_URL}/lyrics`, {
            artists: currentSong.artists,
            song: currentSong.name
        }).then( res => {
            setLyrics(res.data.lyrics || "Lyrics not found")
        }).catch(() => {
        })
    }, [currentSong]);

    return (
        <Container
            className="d-flex flex-row py-5"
            style={{ height: "100vh" }}
        >
            <Container
                className="d-flex flex-column px-5"
                style={{ height: "100%" }}
            >
                <Form.Control
                    className="mb-2"
                    type="search"
                    placeholder="Search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <div className="flex-grow-1 my-2" style={{overflowY: "auto"}}>
                    {songs.map( (song: any) => {
                        return <Song song={song} playSong={playSong} key={song.id} />
                    })}
                </div>
            </Container>
            <Container
                className="d-flex flex-column px-5"
                style={{ height: "100%" }}
            >
                {
                    currentSong &&
                    <div className="mb-2">
                        <Player accessToken={accessToken || ''} songUrl={currentSong?.url} />
                    </div>
                }
                <div className="text-center flex-grow-1 py-2" style={{whiteSpace: "pre", overflowY: "auto"}}>
                    {lyrics}
                </div>
            </Container>
        </Container>
    )
}
