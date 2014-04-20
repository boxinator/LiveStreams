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