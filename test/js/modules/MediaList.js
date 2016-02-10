var assert = require('chai').assert;
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var MediaList = require('./../../../src/js/modules/MediaList.js');
var MediaItem = require('./../../../src/js/modules/MediaItem.js');

describe('mediaList', function() {
  var shallowRenderer = TestUtils.createRenderer();
  var component;
  var instance;

  var oneItemArray = [
    {"title":'title - one', "desc": "desc - one"}
  ];
  var twoItemArray = [
    {"title":'title - one', "desc": "desc - one"},
    {"title":'title - two', "desc": "desc - two"}
  ];
  var sixItemArray = [
    {"title":'title - one', "desc": "desc - one"},
    {"title":'title - two', "desc": "desc - two"},
    {"title":'title - three', "desc": "desc - three"},
    {"title":'title - four', "desc": "desc - four"},
    {"title":'title - five', "desc": "desc - five"},
    {"title":'title - six', "desc": "desc - six"}
  ];
  describe('initialize', function() {
    beforeEach(function(){
      shallowRenderer.render(renderComponentWithData(oneItemArray));
      return component = shallowRenderer.getRenderOutput();
    });
    it('should initialize with the correct className', function() {
      assert.equal(component.props.className, 'mediaList');
    });
  });

  describe('passing one item', function() {
    beforeEach(function(){
      shallowRenderer.render(renderComponentWithData(oneItemArray));
      return component = shallowRenderer.getRenderOutput();
    });
    it('should contain one child', function() {
      assert.lengthOf(component.props.children, 1);
    });
    it('one child should be a ListItem', function() {
      assert.equal(true, isEqualToMediaItem(component.props.children[0]));
    });
  });

  describe('passing two items', function() {
    beforeEach(function(){
      shallowRenderer.render(renderComponentWithData(twoItemArray));
      return component = shallowRenderer.getRenderOutput();
    });
    it('should contain two children', function() {
      assert.lengthOf(component.props.children, 2);
    });
    it('each child should be a ListItem', function() {
      component.props.children.map(function(item, index) {
        assert.equal(true, isEqualToMediaItem(item));
      })
      }
    );
  });


  function beforeEachHelper(data){
    return function() {
      shallowRenderer.render(renderComponentWithData(data));
      return component = shallowRenderer.getRenderOutput();
    }
  }
});

function isEqualToMediaItem(child) {
  return TestUtils.isElementOfType(child, MediaItem);
}
function renderComponentWithData(data) {
  return React.createElement(
      MediaList,
      {
        className: 'mediaList',
        data: data
      }
  );
}
