/**
 * Created by theodora on 6/3/14.
 */

(function () {

    var ItemModel = Backbone.Model.extend({
        url: '/item.json',

        initialize: function(options) {
            this.options = options || {};
        },

        parse: function(data) {
            if (data.result && data.result.item) {
                this.set(data.result.item);
            }
        },

        save: function() {
            console.log("You clicked save! You seem very sure of yourself. Good for you!");
            console.log(JSON.stringify(this));
        }
    });

    window.ItemModel = ItemModel;
}());