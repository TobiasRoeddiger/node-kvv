# node-kvv [![npm version](https://badge.fury.io/js/node-kvv.svg)](https://badge.fury.io/js/node-kvv)
Node.js wrapper for the KVV (Karlsruher Verkehrsverbund) live API. 🚄

## Installation
Navigate to your node.js project over the command line and install the npm package using the following command.
```bash
npm install node-kvv --save
```
## Usage
```js
var nodeKvv = require('node-kvv')

// Searching stops by name
nodeKvv.searchStopsByName('Karlsruhe Marktplatz');

// Searching stops by latitude and longitude
nodeKvv.searchStopsByLatLong(48.34342, 7.234234); // lat, long

// Search stop by id
nodeKvv.searchStopByStopId('de:123:er');

// Search departures from stop by stop ID
nodeKvv.getDepartures('de:123:er'); // default will return the next 4 departures
nodeKvv.getDepartures('de:123:er', 8); // will return the next 8 departures
```
