import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player({accessToken, songUrl}: {accessToken: string, songUrl: string}) {
    if ( accessToken ) {
        return <SpotifyPlayer
            token={accessToken}
            showSaveIcon
            uris={songUrl ? [songUrl] : []}
        />
    } else {
        return <div>No Access Token Provided</div>
    }

}
