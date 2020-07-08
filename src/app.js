
const path = require('path')
const express = require('express')
const hbs = require('hbs')


const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const forecast = require(path.join(__dirname, '/utils/forecast.js'))
const geocode = require(path.join(__dirname, '/utils/geocode.js'))

const app = express()

// setup directory to serve
app.use(express.static(path.join(__dirname, '../public')))

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Homepage
app.get('', (req, res) =>{
    res.render('index',{
        title: 'Weather app',
        name: 'Dougy Fresh'
    })
})

// about page
app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'Weather app',
        name:'Dougy Fresh'
    })
})

// help page
app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Weather app',
        designer:'Dougy Fresh'
    })
})

// weather page
app.get('/weather', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "Please provide search address"
        })
    }

    geocode(req.query.search, (error, {lat, long, name} = {}) => {
        if (error) {
            return res.send({
                error: "Unexpected Error"
            })
        } else {
            forecast(lat, long, (error, {temp, feelslike} = {}) => {
                if (error){
                    return res.send({
                        error: " Unexpected error"
                    })
                } else {
                    res.send({
                        forecast: 'Temperature is ' + temp + ' but feels like ' + feelslike,
                        location: name,
                        address: req.query.search,
                    })
                }
            })
        }
    })

    
})

// Endpoint to accept address
app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "Please provide search time"
        })

    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

// help 404
app.get("/help/*", (req, res) =>{
    res.render('404', {
        errorMessage: 'help article not found',
        title: 'Weather app',
        name: 'Dougy'
    })
})

// Setup 404
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: '404 not found',
        title: 'Weather app',
        name: 'Dougy'
    })
})

app.listen(3000, () =>{
    console.log('Server is up and running!')
})