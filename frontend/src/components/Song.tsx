export default function Song({song, playSong}: { song: any, playSong: any }) {
    function handlePlay() {
        playSong(song)
    }
    return (
        <div
            className="d-flex m-2 align-items-center"
            style={{cursor: "pointer"}}
            onClick={handlePlay}
        >
            <img src={song.albumImage} style={{height: "64px", width: "64px"}}/>
            <div className="ml-3">
                <div>{song.name}</div>
                <div className="text-muted">{song.artists.join(" | ")}</div>
            </div>
        </div>
    )
}
