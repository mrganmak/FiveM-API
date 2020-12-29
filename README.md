# FiveM-API
## Installation 
```
  npm i fivem-api.js --save
```

## Usage
Get current online
```js
const FiveM = require('fivem-api.js'); // Import npm.
const server = new FiveM.server('000.00.000.00:30120'); //Create new server with ip and port.

(async function() {
	const serverInfo = await server.getServerInfo(); //Get server info.

	console.log(serverInfo.getResources()); //Get and log resources. (This information is not updated, if you want to update it, use serverInfo.updateInfo() or server.getServerInfo())
})();
```

Get all server resources
```js
const FiveM = require('fivem-api.js'); // Import npm.
const server = new FiveM.server('000.00.000.00:30120'); //Create new server with ip and port.

(async function() {
	const playersInfo = await server.getPlayersInfo(); //Get players info.

	console.log(playersInfo.getOnline()); //Get and log current online. (This information is not updated, if you want to update it, use playersInfo.updateInfo() or server.getPlayersInfo())
})();
```

Update info
```js
const FiveM = require('fivem-api.js'); // Import npm.
const server = new FiveM.server('194.67.204.70:30120'); //Create new server with ip and port.

(async function() {
	const serverInfo = await server.getServerInfo(); //Get server info.

	console.log(serverInfo.getResources()); //Get and log resources.

	await serverInfo.updateInfo(); // Update info (the same function is used for PlayersInfo)

	console.log(serverInfo.getResources()); //Now we have updated info
})();
```

## All functions
  **index**
  - getPlayersInfo - return PlayersInfo class
  - getServerInfo - return ServerInfo class
  
  **PlayersInfo**
  - getOnline - return current online (number)
  - getPlayersList - return players list (object)
  - getDiscordIdentifier(opts) - return discord id of all users (object)
  - updateInfo - updates information about players (Promise)
  
  **ServerInfo**
  - getResources - return all server resources (array)
  - getBaner - return server banners (object)
  - getMaxClients - return server max client count (number)
  - getTags - return all server tags (string)
  - hasScriptHookAllowed - return server scriptHookAllowed status (boolean)
  - getLicenseKeyToken - return server license key token (string)
  - getVersion - return server version (number)
  - updateInfo - updates information about server (Promise)
## GetDiscordIdentifier opts
  - deleteUndefined = boolean - if this option have a true value, all users with undefined id will be skipped