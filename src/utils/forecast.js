const request = require('request')

// Code refactored using Es6 Destructuring
// See playground/5-es6-object.js
const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/0355e93281a2a48898bc46af7df96404/' + latitude + ',' + longitude

    // before refactoring 
    // request({ url : url, json: true }, (error, response) => {
    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to weather service.')
                // response.body.features.length 
        } else if (body.length === 0) {
            callback('Unable to find weather.')
                // response.body.error
        } else if (body.error) {
            callback('Unable to find weather.')
        } else {

            const { temperature, precipProbability, summary } = body.currently

            callback(undefined, {
                'temperature': temperature,
                'probability': precipProbability,
                'totalSummary': summary

            })
        }

    })
}


module.exports = forecast