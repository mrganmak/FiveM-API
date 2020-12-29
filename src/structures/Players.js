module.exports = class Players {
	constructor(playersList) {
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