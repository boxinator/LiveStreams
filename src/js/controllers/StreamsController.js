
App.StreamsController = Ember.ArrayController.extend({
	scrolling: false,
	filters: ["Most Viewers", "Favorites"],
	activeFilter: "Most Viewers",

	filteredStreams: function() {
		return this.get('content');
	}.property('this.activeFilter')
});
