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
            var ammount = $obj.closest('.to-card-block').find('input.product-ammount').val()
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

            // debug
            /*this.typeaheadInput.on([
                'typeahead:active',
                'typeahead:idle',
                'typeahead:open',
                'typeahead:close',
                'typeahead:change',
                'typeahead:render',
                'typeahead:select',
                'typeahead:autocomplete',
                'typeahead:cursorchange'
            ].join(' '), function($e){
                var args, type, text;
                args = [].slice.call(arguments, 1);
                type = $e.type;
                text = window.JSON ? JSON.stringify(args) : '';
                console.log(type, text);
            });*/
        }
    };
    catalog.initialize();
}());