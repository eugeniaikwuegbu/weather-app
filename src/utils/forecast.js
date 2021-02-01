const request = require('request')

// const url = `http://api.weatherstack.com/current?access_key=d21a17a4ebaac833a31e870c33e74b25&query=lagos,nigeria`

// request({url, json:true}, (error,response) =>{  //json:true parses the json data, when this is set to true, there is no need to use JSON.parse to parse the json data
//     const data = response.body.current
//     console.log(`It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out`)
// })


const forecast = (lat,lon, callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=d21a17a4ebaac833a31e870c33e74b25&query=${lat},${lon}`
request({url, json: true}, (error, {body}) =>{
    if(error){
        callback(`Cannot connect to weather services`)
    }else if(body.error){
        callback(`Invalid Search text, Try another one`)
    }else {
        callback(undefined, `The temperature is ${body.current.temperature} degrees, but it feels like ${body.current.feelslike} degrees and the weather is ${body.current.weather_descriptions[0]}`)
    }
})
}

module.exports= forecast