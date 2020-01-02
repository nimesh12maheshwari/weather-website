const path=require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port=process.env.PORT || 3000

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../tempelates/views')
const partialsPath=path.join(__dirname,'../tempelates/partials')

// Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather app',
		name:'Nimesh'
	})
})

app.get('/about', (req, res)=>{
	res.render('about', {
		title: 'About me',
		name: 'Nimesh'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		helpText: 'this is help message',
		title: 'Help',
		name: 'Nimesh'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error:'You must provide an address!'
		})
	}

	geocode(req.query.address, (error, { latitude, longitude, location } = { }) => {
		if (error) {
			return res.send({error})
		}
		forecast(latitude, longitude, (error,forecastData) => {
			if (error) {
				return res.send({ error })
			}
			res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			})
		})
	})
	
})

app.get('/help/*', (req,res) => {
	res.render('404', {
		title: '404',
		name: 'Nimesh',
		errorMessage: 'Help article not found.'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Nimesh',
		errorMessage:'Page not found.'
	})
})
// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
	console.log('Server is up on port '+port)
})