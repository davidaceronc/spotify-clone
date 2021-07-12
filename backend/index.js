const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")
const spotifyWebApi = require('spotify-web-api-node')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.post('/login', ( req, res ) => {
	const { code } = req.body
	const spotifyApi = new spotifyWebApi({
		redirectUri: 'http://localhost:3000',
		clientId: '6b47ef29af744b69b9a16041b4c224aa',
		clientSecret: '62a8c83e8414424a821bd7ca513c7503'
	})
	spotifyApi.authorizationCodeGrant(code).then( data => {
		console.log(data)
		res.json({
			accessToken: data.body.access_token,
			refreshToken: data.body.refresh_token,
			expiresIn: data.body.expires_in
		})
	}).catch((error) => {
		console.log(error)
		res.sendStatus(400)
	})
})

app.post('/refresh', ( req, res ) => {
	const { refreshToken } = req.body
	const spotifyApi = new spotifyWebApi({
		redirectUri: 'http://localhost:3000',
		clientId: '6b47ef29af744b69b9a16041b4c224aa',
		clientSecret: '62a8c83e8414424a821bd7ca513c7503',
		refreshToken
	})
	spotifyApi.refreshAccessToken().then( data => {
		res.json({
			accessToken: data.body.access_token,
			expiresIn: data.body.expires_in
		})
	}).catch((error) => {
		console.log(error)
		res.sendStatus(400)
	})
})

app.listen(3001)