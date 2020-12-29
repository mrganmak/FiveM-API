const request = require('request');

module.exports = class PlayersInfo {
	constructor(serverIp, playersList) {
		this._serverIp = serverIp;
		this._playersList = playersList;
	}

	getOnline() {
		return this._playersList.length;
	}

	getPlayersList() {
		const players = { };

		for (const currentPlayer of this._playersList) {
			players[currentPlayer.name] =  currentPlayer;

			delete players[currentPlayer.name].name;
		}

		return players;
	}

	getDiscordIdentifier(opts = { }) {
		const players = { };

		for (const currentPlayer of this._playersList) {
			const discordId = this._findDiscordId(currentPlayer.identifiers);
			
			if (!discordId && opts.deleteUndefined === true) continue;

			players[currentPlayer.name] = discordId
		}
	
		return players;
	}

	updateInfo() {
		return new Promise((resolve, reject) => {
			this._fetchPlayers()
				.then(playersList => {
					this._playersList = playersList;

					resolve('done');
				})
				.catch(error => reject(error));
		});
	}

	_fetchPlayers() {
		return new Promise((resolve, reject) => {
			request({
				url: `http://${this._serverIp}/players.json`,
				json: true
			}, (error, response, body) => {
				if(!error && body && response.statusCode == 200) resolve(body) 
				else reject(error);
			});
		});
	}

	_findDiscordId(list) {
		let result = undefined;

		for (const identifier of list) {
			const splitIdentifier = identifier.split(':');
	
			if (splitIdentifier[0] === 'discord') {
				result = splitIdentifier[1];
	
				break;
			}
		}
	
		return result;
	}
}