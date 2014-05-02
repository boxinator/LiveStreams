App.StreamsController = Ember.ArrayController.extend({
	filters: ["streams", "streams.featured"],
	activeFilter: "streams",
	query: '',

	filteredStreams: function() {
		this.transitionToRoute(this.activeFilter);
	}.observes('this.activeFilter')
});
