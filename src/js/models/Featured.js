App.Featured = DS.Model.extend({
	primaryKey: "id",
	game: DS.attr(), 
	viewers: DS.attr(),
	preview: DS.belongsTo('preview'),
	channel: DS.belongsTo('channel'),
});