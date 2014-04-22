App.FeaturedAdapter  = App.ApplicationAdapter.extend({
	// force adapter to use jsonp for accessing twitch data.
	ajaxOptions: function(url, type, hash) {
		url = url.replace('featureds', 'streams/featured');
		this._super(url, type, hash);
		return hash;
	}
});

