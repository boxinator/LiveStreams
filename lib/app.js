/*! LiveStreams - v0.1.0 - 2014-04-13
* https://github.com/box/liveStreams
* Copyright (c) 2014 Alex Ramos; Licensed MIT */
App = Ember.Application.create();
/*
App.Router.map(function() {
	//this.resource('streams');
});*/

/*App.TwitchAdapter = DS.Adapter.extend({
	find: function(store, type, id) {
		debugger;
	},

	createRecord: function() {

	},

	updateRecord: function() {

	},

	deleteRecord: function() {

	},
	
	findAll: function(store, type) {
		var tw = Twitch.api({method:'streams'});
		debugger;
	},

	findQuery: function() {

	}
	
});*/
App.ApplicationAdapter  = DS.RESTAdapter.extend({
	host: 'https://api.twitch.tv/kraken',
	headers: {
		"client_id": "",
		"x-api-version": "2"
	}, 
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

App.ApplicationSerializer = DS.RESTSerializer.extend({
	primaryKey: "_id",
	extractMeta: function(store, type, payload) {
		if (payload) {
			//store.metaForType(type, { total: payload._total });  // sets the metadata for "post"
			//store.metaForType(type, { total: payload._total });  // sets the metadata for "post"
			delete payload._total;  // keeps ember data from trying to parse "total" as a record
			delete payload._links;  // keeps ember data from trying to parse "total" as a record
		}
	}
});

App.StreamSerializer = DS.RESTSerializer.extend({
	primaryKey: "_id",
	extractMeta: function(store, type, payload) {
		if (payload) {
			//store.metaForType(type, { total: payload._total });  // sets the metadata for "post"
			//store.metaForType(type, { total: payload._total });  // sets the metadata for "post"
			delete payload._total;  // keeps ember data from trying to parse "total" as a record
			delete payload._links;  // keeps ember data from trying to parse "total" as a record
		}
	},
	extractArray: function(store, type, payload, id, requestType) {
	/* var comments = payload.post.comments,
	commentIds = comments.mapProperty('id');

	payload.comments = comments;
	payload.post.comments = commentIds;*/
	var previews = [];
	var index = 0;
	payload.streams.forEach(function(item) {
		var preview = item.preview;
		preview._id = index;
		previews.push(preview);

		item.preview_id = index;

		index++;
	});
	console.log(payload)
	payload.previews = previews;

	return this._super.apply(this, arguments);
	}
});

App.IndexRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('stream');
	}
});



// Stream route app state.
App.IndexController = Ember.ArrayController.extend({
	scrolling: false,
	streams: function() {
		return this.content;
	}.property('content')
});

App.Stream = DS.Model.extend({
	primaryKey: "id",
	game: DS.attr(), 
	viewers: DS.attr(),
	preview: DS.belongsTo('App.Preview'),
	links: DS.attr(),
	channel: DS.attr()
});

App.Preview = DS.Model.extend({
	small: DS.attr(),
	medium: DS.attr(),
	large: DS.attr(),
	template: DS.attr()
})

