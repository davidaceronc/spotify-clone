require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")
const spotifyWebApi = require('spotify-web-api-node')
const lyricsFinder = require('lyrics-finder')

const redirectUri = process.env.REDIRECT_URI
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

const port = 3001;

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/login', ( req, res ) => {
	const { code } = req.body
	const spotifyApi = new spotifyWebApi({
		redirectUri: redirectUri,
		clientId: clientId,
		clientSecret: clientSecret
	})
	spotifyApi.authorizationCodeGrant(code).then( data => {
		res.json({
			accessToken: data.body.access_token,
			refreshToken: data.body.refresh_token,
			expiresIn: data.body.expires_in
		})
	}).catch((error) => {
		res.sendStatus(400)
	})
})

app.post('/refresh', ( req, res ) => {
	const { refreshToken } = req.body
	const spotifyApi = new spotifyWebApi({
		redirectUri: redirectUri,
		clientId: clientId,
		clientSecret: clientSecret,
		refreshToken
	})
	spotifyApi.refreshAccessToken().then( data => {
		res.json({
			accessToken: data.body.access_token,
			expiresIn: data.body.expires_in
		})
	}).catch(() => {
		res.sendStatus(400)
	})
})

app.post('/search', ( req, res ) => {
	const { search, accessToken } = req.body
	const spotifyApi = new spotifyWebApi({
		clientId: clientId,
		accessToken
	})
	spotifyApi.searchTracks(search).then( data => {
		const { tracks } = data.body
		if (!tracks) throw Error ('Spotify Search Failed')
		res.json({
			songs: tracks.items.map( track => {
				const albumImages = track.album.images
				const smallestAlbumImage = albumImages.reduce( (smallest, image) => {
					if ( image.height < smallest.height ) return image
					return smallest
				}, albumImages[0])
				return {
					id: track.id,
					name: track.name,
					artists: track.artists.map( artist => { return artist.name } ),
					url: track.uri,
					albumImage: smallestAlbumImage.url
				}
			}) || []
		})
	}).catch(() => {
		res.sendStatus(400)
	})
})

app.post('/lyrics', async ( req, res ) => {
	const { artists, song } = req.body
	for ( const artist of Object.values(artists) ) {
		const lyrics = ( await lyricsFinder(artist, song) )
		if ( lyrics ) {
			res.json({
				lyrics
			})
			break
		}
	}
})

app.listen(port)