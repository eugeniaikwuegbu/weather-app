const express = require('express')
const path = require('path')
const hbs = require('hbs')
const findByAddress = require('./utils/findByAddress')
const forecast = require('./utils/forecast')


//Assigning the express function to a var
const app = express()


app.set('view engine', 'hbs')
const port = process.env.PORT || 3000
// console.log(port)

//fetching the paths for express config
const publicFolder = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setting the hbs to run in express
app.set('view engine', 'hbs')
app.set('views', viewsPath)         //if you want to change the folder name where the hbs files live
hbs.registerPartials(partialsPath)  //registers the partial dir on hbs


//serving up the public folder
app.use(express.static(publicFolder))


//serving up pages manually
app.get('/weather', (req,res) => {
    const address = req.query.address
    if(!address){
        return  res.send({error : 'Address must be provided'})
    }
findByAddress(address, (error, {location, lat,lon} = {}) =>{
    if (error){
        return res.send({error})
    } 
forecast(lat, lon, (error, foreCastData) => {
    if(error){
        return res.send({error})
    }
    res.send({
        forecast:foreCastData,
        location:location,
        address:address
            })
        })
    })
})

// app.get('/about', (req, res) => {
//     res.send('<h1>About me<h1>')
// })

app.get( '', (req,res) => {
    res.render('index',{
        title : 'Weather app',
        name: 'Eugenia'
    })                          //this renders the index.hbs file without needing to include the hbs extension
})

app.get('/about', (req, res) =>{
    res.render('about',{
        name: 'Eugenia',
        title : 'Thats me'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        help : 'Need some help?',
        title : 'Help',
        name : 'Eugenia Ikwuegbu'
    })
})

//setting up error pages

app.get('/help/*', (req, res) => {
    res.render('error', {
        error: 'Help article not found',
        name : 'Eugenia',
        title : '404'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        error: 'Page not found',
        name : 'Eugenia',
        title : '404'
    })
})
//server listening on the port
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})