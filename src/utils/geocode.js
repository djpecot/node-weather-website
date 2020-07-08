const request = require('request')

// Setup mapbox API stuff
const mb_apikey = 'pk.eyJ1IjoiZGpwZWNvdCIsImEiOiJja2JyaHQzMmcwN2RyMnBxeHRoaXhnOTAxIn0.yqBtpGgrye1L-K6RKAIRag'

const geocode = (address, callback) => {

    const url  = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + mb_apikey + '&limit=1'
    request({url, json: true }, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather service')
            
        } else if (!body.features) {
            callback('Unable to find location, check what you are searching')

        } else {
            callback(undefined, {
                lat : body.features[0].center[1],
                long : body.features[0].center[0],
                name : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode