const hotelForm = document.querySelector('.hotel-form')
const destinationElement = document.querySelector('#destination')
const checkinElement = document.querySelector('#checkin')
const checkoutElement = document.querySelector('#checkout')
const paxElement = document.querySelector('#pax')
const hotelMessageOne = document.querySelector('#hotel-message-1')
const divHotelResults = document.querySelector('.hotel-results')

hotelForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const destination = destinationElement.value
    const checkin = checkinElement.value
    const checkout = checkoutElement.value
    const pax = paxElement.value

    const hotelUrl = '/hotelSearch?destination=' + destination + '&checkin=' + checkin + '&checkout=' + checkout + '&pax=' + pax

    hotelMessageOne.textContent = 'Loading Hotel Results.....'


    fetch(hotelUrl).then((response) => {
        response.json().then((data) => {
            if (data.error) {

                hotelMessageOne.textContent = data.error

            } else {
                hotelMessageOne.textContent = 'Data:'
                const divContainer = document.createElement('div')
                    //hotelMessageTwo.textContent = JSON.stringify(data.hotels)
                data.hotels.forEach(element => {
                    divContainer.innerHTML += 'Hotel Code: ' + element.hotel_code + '<br>' + 'Price: ' + element.price + '<br>' + 'Currency: ' + element.currency + '<br>' +
                        'Price Per Night: ' + JSON.stringify(element.pricePerNight) + '<br><br>'
                });
                divHotelResults.appendChild(divContainer)
            }

        })

    })
})