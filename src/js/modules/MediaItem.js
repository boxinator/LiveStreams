var React = require('react');

var MediaItem = React.createClass({
  render: function() {
    return (
      <div className="media">
        <div className="title">{this.props.title}</div>
        <div className="desc">{this.props.desc}</div>
      </div>
    );
  }
});


module.exports = MediaItem;
