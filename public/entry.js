/**
 * Created by theodora on 6/9/14.
 */
/*var $ = require('./js/jquery');
var _ = require('./js/underscore');
var Backbone = require('./js/backbone');*/
require('./js/jquery');
require('./js/underscore');
require('./js/backbone');
require('./bootstrap/js/bootstrap');

var ItemModel = require('./js/models/Item');
var ItemView = require('./js/views/Item');

var View = new ItemView({
    model: new ItemModel()
});

//require('./bootstrap/js/bootstrap.min');