App.StreamsController = Ember.ArrayController.extend({
	scrolling: false,
	filters: ["streams", "streams.featured"],
	activeFilter: "streams",

	filteredStreams: function() {
		this.transitionToRoute(this.activeFilter);
	}.observes('this.activeFilter')
});
