var React = require('react');
var MediaItem = require('./MediaItem.js');

var MediaList = React.createClass({
  render: function() {
    var items = this.props.data;
    return (
      <div className="mediaList">
        {
          items.map(function(item, index) {
            return <MediaItem title={item.title} desc={item.desc} key={index}/>;
        })

        }
      </div>
    );
  }
});


module.exports = MediaList;
