module.exports = class ServerInfo {
	constructor(serverInfo) {
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

	getlicenseKeyToken() {
		return this._serverInfo.vars.sv_licenseKeyToken;
	}

	getVersion() {
		return this._serverInfo.version;
	}
}