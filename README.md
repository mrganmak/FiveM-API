# FiveM-API
## Installation 
```
  npm i fivem --save
```

## Usage
Get current online
```js
const FiveM = require('./src/index.js'); // Import npm.
const server = new FiveM.server('194.67.204.70:30120'); //Create new server with ip and port.

(async function() {
	const serverInfo = await server.getServerInfo(); //Get server info.

	console.log(serverInfo.getResources()); //Get and log resources. (This information is not updated, if you want to update it, use serverInfo.updateInfo() or server.getServerInfo())
})();
```

Get all server resources
```js
const FiveM = require('./src/index.js'); // Import npm.
const server = new FiveM.server('194.67.204.70:30120'); //Create new server with ip and port.

(async function() {
	const playersInfo = await server.getPlayersInfo(); //Get players info.

	console.log(playersInfo.getOnline()); //Get and log current online. (This information is not updated, if you want to update it, use playersInfo.updateInfo() or server.getPlayersInfo())
})();
```

## All functions
  **index**
  - getPlayersInfo - return PlayersInfo class
  - getServerInfo - return ServerInfo class
  
  **PlayersInfo**
  - getOnline - return current online (number)
  - getPlayersList - return players list (object)
  - getDiscordIdentifier - return discord id of all users (object)
  - updateInfo - updates information about players
  
  **ServerInfo**
  - getResources - return all server resources (array)
  - getBaner - return server banners (object)
  - getMaxClients - return server max client count (number)
  - getTags - return all server tags (string)
  - hasScriptHookAllowed - return server scriptHookAllowed status (boolean)
  - getLicenseKeyToken - return server license key token (string)
  - getVersion - return server version (number)
