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
		var previews = [];
		var channels = [];
		var index = 0;
		payload.streams.forEach(function(item) {
			// create a preview object and give an id
			var preview = item.preview;
			preview._id = index;
			previews.push(preview);
			// create a channel object and give an id
			var channel = item.channel;
			channel._id = index;
			channels.push(channel);

			// after building preview object, replace preview in stream object with id 
			// Otherwise will get store undefined error
			item.preview = index;
			item.channel = index;

			index++;
		});
		// add previews array to payload
		payload.previews = previews;
		payload.channels = channels;

		return this._super.apply(this, arguments);
	}
});