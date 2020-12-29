const request = require('request');
const PlayersInfo = require('./structures/PlayersInfo.js');
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
					.then(players => resolve(new PlayersInfo(this.serverIp, players)))
					.catch(error => reject(error));
			});
		}

		getServerInfo() {
			return new Promise((resolve, reject) => {
				this._fetchInfo()
					.then(serverInfo => resolve(new ServerInfo(this.serverIp, serverInfo)))
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
					else reject(error);
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
					else reject(error);
				});
			});
		}
	}
}