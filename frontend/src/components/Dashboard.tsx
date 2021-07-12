import { useState, useEffect } from 'react';
import { Container, Form } from "react-bootstrap"
import UserAuth from "../hooks/UserAuth";
import axios from "axios";
const SERVER_URL = `http://localhost:3001`

export default function Dashboard({code}: { code: string }) {
    const accessToken = UserAuth(code)
    const [search, setSearch] = useState("")
    const [songs, setSongs] = useState([])

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

    return (
        <Container
            className="d-flex flex-column py-2"
            style={{ height: "100vh" }}
        >
            <Form.Control
                type="search"
                placeholder="Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <div className="flex-grow-1 my-2" style={{overflowY: "auto"}}>
                {songs.map( (song: any) => {
                    return <div key={song.id}>
                        <h1>{song.name}</h1>
                        <p>{song.url}</p>
                    </div>
                })}
            </div>
        </Container>
    )
}
