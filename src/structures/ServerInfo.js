const request = require('request');

module.exports = class ServerInfo {
	constructor(serverIp, serverInfo) {
		this._serverIp = serverIp;
		this._serverInfo = serverInfo;
	}

	getResources() {
		return this._serverInfo.resources;
	}

	getBaner() {
		return {
			banner_connecting: this._serverInfo.vars.banner_connecting,
			banner_detail: this._serverInfo.vars.banner_detail
		}
	}

	getMaxClients() {
		return this._serverInfo.vars.sv_maxClients;
	}

	getTags() {
		return this._serverInfo.vars.tags;
	}

	hasScriptHookAllowed() {
		return this._serverInfo.vars.sv_scriptHookAllowed;
	}

	getLicenseKeyToken() {
		return this._serverInfo.vars.sv_licenseKeyToken;
	}

	getVersion() {
		return this._serverInfo.version;
	}

	updateInfo() {
		return new Promise((resolve, reject) => {
			this._fetchInfo()
				.then(serverInfo => {
					this._serverInfo = serverInfo;

					resolve('done');
				})
				.catch(error => reject(error));
		});
	}

	_fetchInfo() {
		return new Promise((resolve, reject) => {
			request({
				url: `http://${this._serverIp}/info.json`,
				json: true
			}, (error, response, body) => {
				if(!error && body && response.statusCode == 200) resolve(body) 
				else reject(error);
			});
		});
	}
}