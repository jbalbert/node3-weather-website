const request = require('request')

const hotel = (destination, checkin, checkout, pax, callback) => {


    if (destination == 49) {
        var supplier = 'darina'
    } else {
        var supplier = 'egyptairv2'
    }

    const url = 'http://52.19.114.198/develop/suppliers/' + supplier + '/index.php/search?checkin=' + checkin + '&checkout=' + checkout + '&destination=' + destination + '&pax[]=' + pax + '&pasNationality=234'

    request({ url, json: true }, (error, response) => {

        const resultBody = response.body
        if (error) {
            callback('No Hotels Found. Please try again later..')
        } else if (response.statusCode !== 200 && response.statusCode !== 201) {
            callback('No Hotels Found. Please try again later..')
        } else if (resultBody.length === 0) {
            callback('No Hotels Found. Please try again later..')
        } else if (resultBody.error) {
            callback('No Hotels Found. Please try again later..')
        } else if (resultBody.exception) {
            callback('No Hotels Found. Please try again later..')
        } else if (resultBody.message) {
            cacallback('No Hotels Found. Please try again later..')
        } else {
            callback(undefined, resultBody)
        }

    })



}

module.exports = hotel