var React = require('react');
var ReactDOM = require('react-dom');
var MediaList = require('./modules/MediaList.js');

var testData = [
  {"title": "TSM Kripp Playing Dreadstee", "desc": "Krip bio"},
  {"title": "HAFU -- ARENAS! 28K gold (:", "desc": "Hafu bio here"},
  {"title": "Zeus Shaman", "desc": "Norse god desc"},
  {"title": "4-2 | Infinite Arenas", "desc": "Arena desc yo"}
];

var App = React.createClass({
  render: function() {
    return (
      <div id="react-app">
        <h2>Lists</h2>
        <MediaList data={testData} />
      </div>
    );
  }
})

ReactDOM.render(
  <App />,
  document.getElementById('container')
);
