App.Stream = DS.Model.extend({
	primaryKey: "id",
	game: DS.attr(), 
	viewers: DS.attr(),
	favorite: DS.attr('boolean', {defaultValue: false}),
	preview: DS.belongsTo('preview'),
	channel: DS.belongsTo('channel'),
});

App.Featured = App.Stream.extend();