/**
 * Created by theodora on 6/3/14.
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

    changeText: function ( event ) {
        var $target = $(event.currentTarget);
        var data = $target.data('title');
        var val = $target.val();
        if (data && val) {
            this.update(data, val);
        }
    },

    changeMaterial: function( event ) {
        var item = this.model.get('material');
        var $target = $(event.currentTarget);
        var data = $target.val();
        if (item && data) {
            item.description = data;
            this.update('material', item);
            this.$('#dropdownText').html(data);
        }
    },

    check: function ( event ) {
        //Updates checkbox
        var item = this.model.get('material');
        if (item) {
            item.restricted = event.currentTarget.checked ? 'Y' : 'N';
            this.update('material', item);
        }
    },

    changeUnit: function ( event ) {
        var item = this.model.get('measurement');
        var $target = $(event.currentTarget);
        var data = $target.data('unit');
        if (item && data) {
            //Update model
            item.unit = data;
            this.update('measurement', item);
            //Update HTML to show new units
            this.$('span.input-group-addon').html(data);
        }
    },

    changeShape: function ( event ) {
        //Update model shape
        var item = this.model.get('measurement');
        var $target= $(event.currentTarget);
        var data = $target.data('shape');
        if (item && data) {
            item.shape = data;
            this.update('measurement', item);
        }
        //Enable measurements
        this.$('[name=measure]').removeAttr('disabled');
        if(data !== 'Circular') {
            this.$('#formDiameter').attr('disabled',true);
        }
    },

    changeMeasurements: function( event ) {
        var item = this.model.get('measurement');
        var $target = $(event.currentTarget);
        var data = ($target.data('dimen') || '').toLowerCase();
        if (item && data) {
            item[data] = $target.val();
            this.update('measurement', item);
        }
    },

    changeConditions: function( event ) {
        var $target = $(event.currentTarget);
        var data = $target.data('condition');
        if (data) {
            this.update('condition', data);
        }
    },

    update: function( key , value) {
        this.model.set( key, value );
    }

});

module.exports = ItemView;