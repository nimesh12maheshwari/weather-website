const request=require('request')

const forecast=(longitude,latitude,callback)=>{
	const url='https://api.darksky.net/forecast/a5285dec41a0c54c7838709f457aaeeb/'+longitude+','+latitude+'?units=si'
	request({url,json:true},(error,{body})=>{
		if(error){
			callback('Unable to connect weather service!',undefined)
		}else if(body.error){										//for wrong input
			callback('Unable to find location',undefined)
		}else{
			callback(undefined,body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees out. There is '+body.currently.precipProbability+'% chance of rain.')
		}
	})
}

module.exports=forecast