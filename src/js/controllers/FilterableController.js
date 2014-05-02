App.FilterableController = Ember.ArrayController.extend({
	needs: ['streams'],

	filteredResults: function() {
		var query = this.get("controllers.streams.query").toLowerCase();
		
				return this.get('content').filter(function(item, index, enumerable) {
					var channel = item.get('channel');
					var name = (channel)? channel.get('display_name').toLowerCase() : '';

					var game = item.get('game');
					game = (game)? game.toLowerCase() : '';

					if (name.indexOf(query) > -1 || game.indexOf(query) > -1) {
						return true;
					}
					return false;
				})
		}.property('controllers.streams.query')
});
