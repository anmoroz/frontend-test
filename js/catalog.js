/**
 * Created by Andrey Morozov on 12.11.2015.
 */
(function() {
    var catalog = {
        typeaheadInput: $('input.typeahead'),
        searchForm: $('#catalog-search-form'),

        initialize : function () {
            this.initTypeahead();
            this.setUpListeners();
        },
        setUpListeners: function () {
            var self = this;
            $(document).on('click', 'button.add-to-basket', function () {
                self.addProductToBasket($(this))
            });
        },
        addProductToBasket: function($obj) {
            var ammount = $obj.closest('.to-card-block, .tt-suggestion').find('input.product-ammount').val()
                , message = 'Add to basket ' + ammount + ' items';
            alert(message);
        },
        initTypeahead: function() {
            var template, empty, engine;

            template = Handlebars.compile($("#result-template").html());
            empty = Handlebars.compile($("#empty-template").html());

            engine = new Bloodhound({
                identify: function(o) { return o.id; },
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                prefetch: 'productlist.json'
            });

            this.typeaheadInput.typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            }, {
                name: 'product-search',
                display: 'name',
                source: engine,
                templates: {
                    suggestion: template,
                    empty: empty
                }
            });

            var typeaheadInputCtrl= this.typeaheadInput.data('tt-typeahead'),
                isClosePrevented = false,
                isSelectPrevented = false;

            $(document)
                .on('mousedown focus', '.tt-add-to-card input, .tt-add-to-card button', function (e) {
                    isSelectPrevented = true;
                    isClosePrevented = true;
                })
                .on('blur', '.tt-add-to-card input, .tt-add-to-card button', function (e) {
                    isSelectPrevented = false;
                    isClosePrevented = false;
                })
            ;

            this.typeaheadInput
                .on('typeahead:active', function (evt) {
                    typeaheadInputCtrl.menu.$node.off('mousedown');
                    isClosePrevented= false;
                })
                .on('typeahead:beforeselect', function (evt) {
                    if (isSelectPrevented) {
                        evt.preventDefault();
                    }
                })
                .on('typeahead:beforeclose', function (evt) {
                    if (isClosePrevented) {
                        evt.preventDefault();
                    }
                })
            ;

        }
    };
    catalog.initialize();
}());