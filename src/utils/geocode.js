const request = require('request');
const geoCodeAPIKey = 'dc4f57758457c983e36c7aa219b687ab';

const getGeoLocation = (address,callback) => {
    const urlToGetCoordinates = `http://api.positionstack.com/v1/forward?access_key=${geoCodeAPIKey}&query=${address}&limit=1&output=json`;
    request({ url: urlToGetCoordinates }, (error, response) => {
        if (error) {
            callback('unable to fetch location data',undefined);
        } else {
            const responseObj = JSON.parse(response.body);
            if (responseObj.data.length == 0) {
                callback("can not fetch location data with provided Name, Please recheck the location passed",undefined);
            } else { 
                const result = {
                    'latitude': responseObj.data[0].latitude,
                    'longitude': responseObj.data[0].longitude
                }
                callback(undefined,result)
            }
        }
    })
}

module.exports = getGeoLocation