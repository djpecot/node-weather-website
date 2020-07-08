
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#m1')
const messageTwo = document.querySelector('#m2')

weatherForm.addEventListener('submit', (e) => {
    
    e.preventDefault() // prevents browser from refreshing

    const location = searchElement.value

    if (!location) {
        console.log('Please type a location!')
        messageOne.textContent = ''
        return messageTwo.textContent = "Please input a Location in the search bar above!"
    }

    messageOne.textContent = 'Loading Weather Data...'
    messageTwo.textContent = ""

    fetch('/weather?search=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error){
            messageOne.textContent = data.error
        } else {
            console.log(data)
            messageOne.textContent = "Weather data for " + data.location + ":"
            messageTwo.textContent = data.forecast + " in " + data.location
        }
    })
})
    console.log(location)
})