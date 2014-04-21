App.StreamsFeaturedRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('featured');
	}
});