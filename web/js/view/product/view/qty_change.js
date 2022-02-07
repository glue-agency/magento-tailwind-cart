define([
    'jquery',
    'ko',
    'uiComponent'
], function ($, ko, Component) {
    'use strict';

    return Component.extend({
        initialize: function () {
            //initialize parent Component
            this._super().initObservable();
            this.qty = ko.observable(this.defaultQty);
        },

        initObservable: function () {
            this._super().observe('isUpdateButtonVisible');

            return this;
        },

        decreaseQty: function () {
            var newQty = this.qty() - 1;

            if (this.allowZeroQty) {
                if (newQty < 0) {
                    newQty = 0;
                }
            } else {
                if (newQty < 1) {
                    newQty = 1;
                }
            }

            this.qty(newQty);

            // this.isUpdateButtonVisible(newQty !== this.defaultQty);
            if (newQty !== this.defaultQty) {
                $('#' + this.index + ' button[type=submit]').click();

                $('body').trigger('processStart');

            }
        },

        increaseQty: function () {
            var newQty = this.qty() + 1;
            this.qty(newQty);

            // this.isUpdateButtonVisible(newQty !== this.defaultQty);
            if (newQty !== this.defaultQty) {
                $('#' + this.index + ' button[type=submit]').click();

                $('body').trigger('processStart');
            }
        },

        checkQty: function () {
            var newQty = parseInt($('#' + this.index + ' input').val());

            if (newQty < 1) {
                newQty = 1;
                $('#' + this.index + ' input').val(1)
            }

            this.qty(newQty);

            if (newQty !== this.defaultQty) {
                $('#' + this.index + ' button[type=submit]').click();

                $('body').trigger('processStart');

            }
        }
    });
});
