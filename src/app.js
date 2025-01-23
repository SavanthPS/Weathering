const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js');

const app = express()

const ports = process.env.PORT || 3000;

//define paths for expresss config 
const publicDIr = path.join(__dirname,'../public')
const viewPaths = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and view location 
app.set('view engine','hbs')
app.set('views', viewPaths)
hbs.registerPartials(partialsPath)

//setup static directory t serve 
app.use(express.static(publicDIr))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Alex God'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Alex God'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Alex God'
    })
})


app.get('/weather', (req, res) => {
    if(req.query.address.length === 0) { 
        return res.send({
            error:'You must provide a valid weather address !',
        })
    }

    geocode(req.query.address, (error, {latitude,longitude, displayname} = {}) => { //{} helps to give undefined if lat, lon and display name ias defuaut undfeined 
        if (error)
            return res.send({ error })
        forecast(latitude,longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })       
            }
            res.send({
                forecast: forecastdata,
                location: req.query.address,
                address: displayname,
                name: 'Alex God'
            })

        })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'HELP ARTCLE',
        title: '404',
        name: 'Alex God'
    })    
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'PAGE',
        title: '404',
        name: 'Alex God'
    })  })

app.listen(ports, () => {
    console.log('server is up on port '+ports)
})