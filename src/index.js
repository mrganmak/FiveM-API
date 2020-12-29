const request = require('request');
const Players = require('./structures/Players.js');
const ServerInfo = require('./structures/ServerInfo.js');

module.exports = {
	server: class FiveMServer {
		constructor(serverIp) {
			if (serverIp.search(':') == -1) throw new Error('The server ip must have a port');

			this.serverIp = serverIp;
		}

		getPlayersInfo() {
			return new Promise((resolve, reject) => {
				this._fetchPlayers()
					.then(players => resolve(new Players(players)))
					.catch(error => reject(error));
			});
		}

		getServerInfo() {
			return new Promise((resolve, reject) => {
				this._fetchInfo()
					.then(serverInfo => resolve(new ServerInfo(serverInfo)))
					.catch(error => reject(error));
			});
		}

		_fetchPlayers() {
			return new Promise((resolve, reject) => {
				request({
					url: `http://${this.serverIp}/players.json`,
					json: true
				}, (error, response, body) => {
					if(!error && body && response.statusCode == 200) resolve(body) 
					else reject(new Error(error));
				});
			});
		}

		_fetchInfo() {
			return new Promise((resolve, reject) => {
				request({
					url: `http://${this.serverIp}/info.json`,
					json: true
				}, (error, response, body) => {
					if(!error && body && response.statusCode == 200) resolve(body) 
					else reject(new Error(error));
				});
			});
		}
	}
}