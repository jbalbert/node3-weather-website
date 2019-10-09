console.log("Test Js File....")

// this using fetch api of javascript
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



/* The Document method querySelector() returns the first Element within the document that matches the specified selector, or group of selectors. If no matches are found, null is returned.*/
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'asdsad'
// messageTwo.textContent = 'asdsadasdasd'

weatherForm.addEventListener('submit', (event) => {
    // preventDefault() method tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be. 
    event.preventDefault()
    const location = searchElement.value
    const url = '/weather?address=' + location

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {

                messageOne.textContent = data.error

            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast

            }
        })
    })


})