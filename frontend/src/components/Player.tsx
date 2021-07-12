import SpotifyPlayer from 'react-spotify-web-playback'
import { useEffect, useState } from "react";

export default function Player({accessToken, songUrl}: {accessToken: string, songUrl: string}) {
    const [play, setPlay] = useState(false)

    useEffect(() => setPlay(true), [songUrl])
    if ( accessToken ) {
        return <SpotifyPlayer
            token={accessToken}
            showSaveIcon
            uris={songUrl ? [songUrl] : []}
            callback={ state =>{
                if (!state.isPlaying) setPlay(false)
            }}
            play={play}
        />
    } else {
        return <div>No Access Token Provided</div>
    }

}
