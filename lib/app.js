/*
 * LiveStreams
 * https://github.com/box/liveStreams
 *
 * Copyright (c) 2014 Alex Ramos
 * Licensed under the MIT license.
 */

App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});
