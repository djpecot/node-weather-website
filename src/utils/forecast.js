const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dd96cb9106ccf0559bfd9da3f3aa93bf&query=' + lat + ',' + long

    request({url, json: true }, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather service')
        } else {
            console.log(body.current)
            callback(undefined, {
                temp: body.current.temperature,
                feelslike: body.current.feelslike,
                hmdty: body.current.humidity
            })
            // callback(undefined, 'Temp = ' + response.body.current.temperature)
                
        }
    })
}


module.exports = forecast