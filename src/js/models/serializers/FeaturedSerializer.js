App.FeaturedSerializer = DS.RESTSerializer.extend({
	primaryKey: "_id",
	extractMeta: function(store, type, payload) {
		if (payload) {
			delete payload._links;
		}
	},
	extractArray: function(store, type, payload, id, requestType) {
		var previews = [];
		var channels = [];
		var featured = [];
		// cleanup featured by trimming unused data, and created new featured array
		payload.featured.forEach(function(item) {
			// get stream object
			item = item.stream;
			// indicate that its featured
			
			featured.push(item);
			// create a preview object and give an id
			var preview = item.preview;
			preview._id = item._id;
			previews.push(preview);
			// create a channel object and give an id
			var channel = item.channel;
			channel._id = item._id;
			channels.push(channel);

			// after building preview object, replace preview in stream object with id 
			// Otherwise will get store undefined error
			item.preview = item._id;
			item.channel = item._id;
		});
		// add previews array to payload
		payload.featured = featured;
		payload.previews = previews;
		payload.channels = channels;

		return this._super.apply(this, arguments);
	}
});