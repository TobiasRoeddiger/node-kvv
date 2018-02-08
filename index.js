const request = require('request');

const API_KEY = '377d840e54b59adbe53608ba1aad70e8';
const API_BASE = 'https://live.kvv.de/webapp/';

const SEARCH_STOP_BY_NAME_PATH = 'stops/byname/';
const SEARCH_STOP_BY_LAT_LONG_PATH = 'stops/bylatlon/';
const SEARCH_STOP_BY_STOP_ID_PATH = 'stops/bystop/';

const GET_DEPARTURES_BY_STOPID_PATH = "departures/bystop/";
const GET_DEPARTURES_BY_ROUTE_PATH = 'departures/byroute/';

const STOPS_IDENTIFIER = 'stops';

function query(path, params = {}) {
    params['key'] = API_KEY;
    var url = API_BASE + path + "?" + encodeParameters(params);

    return new Promise(function(resolve, reject) {
        request(url, function(error, response, body) {
            resolve(JSON.parse(body));
        });
    }); 
}

function encodeParameters(params) {
    var str = [];
    for(var p in params)
       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
    return str.join("&");
}

function encode(value) {
    return encodeURIComponent(value);
}

module.exports = {
/**
 * Search for stops by name.
 * @param {*} name Name of the stop to look for.
 * @param {*} maxInfos Maximum number of stops to return.
 */
searchStopsByName: async function (name, maxInfos = 2) {
    return (await query(SEARCH_STOP_BY_NAME_PATH + encode(name)))[STOPS_IDENTIFIER].slice(0, maxInfos);
},

/**
 * Search for stops by latitude and longitude.
 * @param {*} latitude Latitude of the position.
 * @param {*} longitude Longitude of the position.
 * @param {*} maxInfos Maximum number of stops to return.
 */
searchStopsByLatLong: async function (latitude, longitude, maxInfos = 2) {
    return (await query(SEARCH_STOP_BY_LAT_LONG_PATH + encode(latitude) + '/' + encode(longitude)))[STOPS_IDENTIFIER].slice(0, maxInfos);
},

/**
 * Search for a stop by the respective stop ID.
 * @param {*} stopId The stop ID to look for.
 */
searchStopByStopId: async function (stopId) {
    return (await query(SEARCH_STOP_BY_STOP_ID_PATH + encode(stopId)));
},

/**
 * Search for departures by stop ID.
 * @param {*} stopId The stop ID that departures should be 
 * @param {*} maxInfos Maximum number of departures to return.
 */
getDepartures: async function (stopId, maxInfos = 4) {
    return (await query(GET_DEPARTURES_BY_STOPID_PATH + encode(stopId), {'maxInfos': maxInfos}));
},

/**
 * 
 * @param {*} stopId 
 * @param {*} route 
 * @param {*} max_info 
 */
getDeparturesByRoute: async function (stopId, route, max_info=4) {
    return (await query(GET_DEPARTURES_BY_ROUTE_PATH + encode(route) + '/' + encode(stopId), {'maxInfos': maxInfos}));
}
};