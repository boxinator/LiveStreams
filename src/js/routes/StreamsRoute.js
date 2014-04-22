App.StreamsIndexRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('stream');
	}
});