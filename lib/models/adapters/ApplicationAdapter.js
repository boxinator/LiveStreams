// Evaluate if I can make this specific to streams only.
App.ApplicationAdapter  = DS.RESTAdapter.extend({
	host: 'https://api.twitch.tv/kraken',
	headers: {
		"client_id": "",
		"x-api-version": "2"
	},
	// force adapter to use jsonp for accessing twitch data.
	ajaxOptions: function(url, type, hash) {
		hash = hash || {};
		hash.url = url;
		hash.type = type;
		hash.dataType = 'jsonp';
		hash.context = this;

		if (hash.data && type !== 'GET') {
			hash.contentType = 'application/json; charset=utf-8';
			hash.data = JSON.stringify(hash.data);
		}

		if (this.headers !== undefined) {
			var headers = this.headers;
			hash.beforeSend = function (xhr) {
				Ember.Enumerable.mixins.forEach.call(Ember.keys(headers), function(key) {
				xhr.setRequestHeader(key, headers[key]);
				});
			};
		}
		return hash;
	}
});

