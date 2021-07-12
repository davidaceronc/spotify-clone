const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const spotify = require('spotify-web-api-node')

const app = express()

app.use(cors)
app.use(bodyParser.json())
app.post('/login', ( req, res ) => {
	const { code } = req.body
	const spotifyApi = new spotify({
		redirectUri: 'http://localhost:3000',
		clientId: '6b47ef29af744b69b9a16041b4c224aa',
		clientSecret: '62a8c83e8414424a821bd7ca513c7503'
	})
	spotifyApi.authorizationCodeGrant(code).then( data => {
		res.json({
			accessToken: data.body.access_token,
			refreshToken: data.body.refresh_token,
			expiresIn: data.body.expires_in
		})
	}).catch(() => {
		res.sendStatus(400)
	})
})

app.listen(3001)