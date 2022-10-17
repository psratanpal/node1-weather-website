const request = require('request');
const weatherAPIKey = '7068f5bc129e628f7181f1df0807a989';

const forecast = (error,response,callback)=>{
    if(error){
        callback({error:error});
    }else{
        const url = `http://api.weatherstack.com/current?access_key=${weatherAPIKey}&query=${response.latitude},${response.longitude}`; 
        request({url:url},(error,response)=>{
            if(error){
                callback({error: 'Unable to fetch weather info'}) 
                // console.log("ERROR: Unable to fetch weather info");
                // console.log("Error : " + error);
            }else{
                const data = JSON.parse(response.body);
            if (data.success==false) {
                const errorHere = data.error.info;
                callback ({error:errorHere})
                // console.log("ERROR : "+errorHere);
            } else {

                const locationName = data.location.name.toString() + " " +(data.location.region.toString()||'');
                const responseObj = {
                    locationName : locationName,
                    countryName : data.location.country.toString(),
                    temperature : data.current.temperature.toString(),
                    desription : data.current.weather_descriptions[0]
                }
                callback(responseObj)
                
                // const locationName = data.location.name.toString() + " " + data.location.region.toString();
                // const countryName = data.location.country.toString();
                // const temperature = data.current.temperature.toString();
                // const desription = data.current.weather_descriptions[0];
                // console.log(`We are reporting from ${locationName} in ${countryName}`);
                // console.log(`the weather in the region is ${desription}`);
                // console.log(`the current temperature in the region is ${temperature} degrees`);
            }
            }
        })
    }
}

module.exports=forecast