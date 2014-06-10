/**
 * Created by theodora on 6/9/14.
 */
var $ = window.jQuery = window.$ = require('./js/jquery');

require('./bootstrap/js/bootstrap');
var ItemModel = require('./js/models/Item');
var ItemView = require('./js/views/Item');

$(function () {
    var View = new ItemView({
        model: new ItemModel()
    });
});