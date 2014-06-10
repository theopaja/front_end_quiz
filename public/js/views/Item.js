/**
 * Created by theodora on 6/3/14.
 */
/*window.app = {
    baseView: Backbone.View.extend({
        el: '#container'
    })
}

////

var SomeView = app.baseView.extend({

});
*/

var $ = require('../jquery');
var _ = require('../underscore');
var Backbone = require('../backbone');

var ItemView = Backbone.View.extend({
    el: '#container',

    events: {
        'click button[type=button]': 'saveButton',
        'change [name=inputTexts]': 'changeText',
        'change [data-materiallist=materiallist]': 'changeMaterial',
        'click input[type=checkbox]': 'check',
        'change [name=unit]': 'changeUnit',
        'change [name=shape]': 'changeShape',
        'change [name=measure]': 'changeMeasurements',
        'change .condition': 'changeConditions'
    },

    initialize: function (options) {
        this.options = options || {};

        this.model.fetch();

        if (this.options.enums) {
            this.enums = this.options.enums;
        } else {
            this.enums = {
                material: ["Wood", "Metal", "Ceramic", "Glass", "Leather"],
                measurement: {
                    unit: {
                        in: "inches",
                        cm: "centimeters"
                    },
                    shape: ["Rectangular", "Circular"]
                },
                condition: {
                    description: ["Distressed", "Fair", "Good", "Excellent"]
                }
            }
        }

        _.templateSettings.variable = 'obj';

        this.templates = {
            textinputs: _.template($('#tmplTextInput').html()),
            materials: _.template($('#tmplMaterials').html()),
            measurements: _.template($('#tmplMeasurements').html()),
            conditions: _.template($('#tmplConditions').html())
        };

        this.render();
        this.$('#radioInches').prop('checked', true);
        this.$('#radioGood').prop('checked', true);
    },

    render: function () {
        var templateData = {
            title: 'Title',
            enums: this.enums,
            dimen: ['Length', 'Depth', 'Height', 'Diameter']
        };

        for (var i in this.templates) {
            this.$el.append(this.templates[i](templateData));
        }

        return this;
    },

    saveButton: function () {
        this.model.save();
    },

    changeModel: function (index, $target, dataval) {
        var item = this.model.get(index);   //Current model
        var val = $target.val();            //DOM element value
        var data = $target.data(dataval);   //DOM element data

        switch (index) {
            //Text boxes (Title, Description, Notes)
            case 'title':
                if (data && val) {
                    this.updateModel(data, val);
                }
                break;
            //Materials
            case 'material':
                switch (dataval) {
                    //Material type/description
                    case 'description':
                        if (item && val) {
                            item[dataval] = val;
                            this.updateModel(index, item);
                            this.$('#dropdownText').html(val);
                        }
                        break;
                    //Restriction checkbox
                    case 'restricted':
                        if (item) {
                            var checked = $target.prop('checked');
                            item[dataval] = checked ? 'Y' : 'N';
                            this.updateModel(index, item);
                        }
                        break;
                    default:
                        break;
                }
                break;
            //Measurements
            case 'measurement':
                switch (dataval) {
                    //Unit of measurement
                    case 'unit':
                        if (item && data) {
                            //Update model
                            item[dataval] = data;
                            this.updateModel(index, item);
                            //Update HTML to show new units
                            this.$('span.input-group-addon').html(data);
                        }
                        break;
                    //Shape of object
                    case 'shape':
                        //Enable measurements
                        this.$('[name=measure]').removeAttr('disabled');
                        if(data !== 'Circular') {
                            this.$('#formDiameter').attr('disabled',true);

                        }
                        //Update Model
                        if (item && data) {
                            item[dataval] = data;
                            this.updateModel(index, item);
                        }
                        break;
                    //Dimensions
                    case 'dimen':
                        if (item && data.toLowerCase()) {
                            item[data.toLowerCase()] = val;
                            this.updateModel(index, item);
                        }
                        break;
                    default:
                        break;
                }

                break;
            //Conditions
            case 'condition':
                if (item && data) {
                    item.description = data;
                    this.updateModel(index, item);
                }
                break;

            default:
                break;
        }
    },

    changeText: function ( event ) {
        this.changeModel('title', $(event.currentTarget), 'title');
/*
        var $target = $(event.currentTarget);
        var data = $target.data('title');
        var val = $target.val();
        if (data && val) {
            this.updateModel(data, val);
        }
*/
    },

    changeMaterial: function( event ) {
        this.changeModel('material', $(event.currentTarget), 'description');
/*
        var item = this.model.get('material');
        var $target = $(event.currentTarget);
        var val = $target.val();
        if (item && val) {
            item.description = val;
            this.updateModel('material', item);
            this.$('#dropdownText').html(val);
        }
*/
    },

    check: function ( event ) {
        this.changeModel('material', $(event.currentTarget), 'restricted');
        //Updates checkbox
/*
        var item = this.model.get('material');
        var $target = $(event.currentTarget);
        var checked = $target.prop('checked');
        if (item) {
            item.restricted = checked ? 'Y' : 'N';
            this.updateModel('material', item);
        }
*/
    },

    changeUnit: function ( event ) {
        this.changeModel('measurement', $(event.currentTarget), 'unit');
/*
        var item = this.model.get('measurement');
        var $target = $(event.currentTarget);
        var data = $target.data('unit');
        if (item && data) {
            //Update model
            item.unit = data;
            this.updateModel('measurement', item);
            //Update HTML to show new units
            this.$('span.input-group-addon').html(data);
        }
*/
    },

    changeShape: function ( event ) {
        this.changeModel('measurement', $(event.currentTarget), 'shape');
/*
        //Update model shape
        var item = this.model.get('measurement');
        var $target= $(event.currentTarget);
        var data = $target.data('shape');
        if (item && data) {
            item.shape = data;
            this.updateModel('measurement', item);
        }
        //Enable measurements
        this.$('[name=measure]').removeAttr('disabled');
         if(data !== 'Circular') {
         this.$('#formDiameter').attr('disabled',true);

         }
*/
    },

    changeMeasurements: function( event ) {
        this.changeModel('measurement', $(event.currentTarget), 'dimen');
/*
        var item = this.model.get('measurement');
        var $target = $(event.currentTarget);
        var data = ($target.data('dimen') || '').toLowerCase();
        var val = $target.val();
        if (item && data) {
            item[data] = val;
            this.updateModel('measurement', item);
        }
*/
    },

    changeConditions: function( event ) {
        this.changeModel('condition', $(event.currentTarget), 'condition');
/*
        var item = this.model.get('condition');
        var $target = $(event.currentTarget);
        var data = $target.data('condition');
        if (item && data) {
            item.description = data;
            this.updateModel('condition', item);
        }
*/
    },

    updateModel: function( key , value) {
        this.model.set( key, value );
    }

});

module.exports = ItemView;