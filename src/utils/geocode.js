// This is how using callback function
// Note: Always remember when creating a reusable function
// Declare module.exports

const request = require('request')


// Code refactored using Es6 Destructuring
// See playground/5-es6-object.js
const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamJhbGJlcnQiLCJhIjoiY2sxMXgzNGJvMGxobTNocDJ4cHczcTlxOSJ9.XimTW_c4RE2WVW2Ehb8khQ&limit=1';

    // before refactoring 
    // request({ url : url, json: true }, (error, response) => {
    request({ url, json: true }, (error, { body }) => {

        if (error) {

            callback('Unable to connect to location services!.')
                // response.body.features.length 
        } else if (body.features.length === 0) {

            callback('Unable to find location. Try Another Search.')
                // response.body.error
        } else if (body.error) {

            callback('Unable to find location.')

        } else {

            const { features } = body

            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name

            })
        }

    })

}

module.exports = geocode