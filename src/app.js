const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
    // calling express
const app = express()
const port = process.env.PORT || 3000

// this assigning which path is going to use.
// Define paths for express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set Up Directory to serve
app.use(express.static(publicDirectoryPath))

// Set Up Handle Bars Engine and views location
// we need to tell express which templating engine are we gonna use
// set('key setting name', value)
// all handle bars file are stored in /web-server/templates/
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// set up partials
hbs.registerPartials(partialsPath)

// to serve up hbs template
app.get('', (request, response) => {
    // this is to render our hbs views
    // first parameter is the name of the file we are rendering
    // the name in here needs to match up with the filename in the views folder
    response.render('index', {
        title: 'Weather App',
        name: 'John Doe'

    })

})


app.get('/about', (request, response) => {
    // this is to render our hbs views
    // first parameter is the name of the file we are rendering
    // the name in here needs to match up with the filename in the views folder
    response.render('about', {
        title: 'About Page',
        name: 'John Doe'

    })

})

app.get('/help', (request, response) => {
    // this is to render our hbs views
    // first parameter is the name of the file we are rendering
    // the name in here needs to match up with the filename in the views folder
    response.render('help', {

        title: 'Help Page',
        name: 'Ryhorn VooDoooss',
        message: 'This is an SOS! Help!'


    })

})



// this let's us configure on what the server should do.
// when someone gets thep resource at a specific url

app.get('/weather', (request, response) => {


    if (!request.query.address) {
        return response.send({
            error: 'Address is required.'
        })
    }
    let address = request.query.address

    // this  = {} is to set an empty value for the objects that we are trying to destructure
    // so that it will not make our application crash if there are wrong parameters passed.
    geocode(address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return response.send({ error })
        }

        forecast(latitude, longitude, (error, weatherData) => {

            if (error) {
                return response.send({ error })
            }

            const weatherResponse = 'Weather Summary: ' + weatherData.totalSummary + ' , it is currently ' + weatherData.temperature +
                ' degrees out. There is a ' + weatherData.probability + ' % chance of rain.'


            response.send({
                forecast: weatherResponse,
                location: location,
                address: address
            })

        })

    })


})


app.get('/products', (request, response) => {

    if (!request.query.search) {
        return response.send({
            error: 'Search parameter is required.'
        })
    }
    console.log(request.query)
    response.send({
        products: []
    })
})

// in case to access a specific route with values
app.get('/help/*', (request, response) => {
    response.render('404', {
        title: 'Not Found Page',
        message: 'Help Article Not Found',
        name: 'Ryhorn VooDooo'

    })
})

// 404 pages should come last
// Important:
// To match every route, express provides a wildcard character like below
app.get('*', (request, response) => {
    response.render('404', {
        title: 'Not Found Page',
        message: '404 Not Found',
        name: 'Ryhorn VooDooo',

    })
})

// this is how to serve up your server
// port and a callback
app.listen(port, () => {
    console.log('Server is up on port 3000')
})