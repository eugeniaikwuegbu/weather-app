const request = require('request')

const findByAddress = (searchText, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchText)}.json?access_token=pk.eyJ1IjoiZXVnZW5pYWlrd3VlZ2J1IiwiYSI6ImNrazhqYTBtcTBtdmMycG1oNDVuc2NtMjYifQ.IagvQGprWSoEr7fPynR8NA`
    request({url, json:true}, (error,{body}) => {  //where the response var that was removed has been destructured since property 'body' lives in the response var and the response var is existent whether or not it is parsed as an arg to the callback
   if(error){   //refers to the low level error ie no network connection
    callback(`Unable to connect to weather services`)
   }else if(body.message || body.features.length=== 0){
    callback(`Invalid search term`)
   }else {
        const lat = body.features[0].center[0]
        const lon = body.features[0].center[1]
    callback(undefined, {
        location:body.features[0].place_name,
        lat,
        lon
            })
        }
    })
}

module.exports= findByAddress