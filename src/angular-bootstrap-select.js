// directive to data communication with bootstrap selectors
(function (window, angular, undefined) {
    'use strict';

    angular
        .module('angular-bootstrap-select', [])
        .directive('bootstrapSelect', bootstrapSelect);

    bootstrapSelect.$inject = [];

    function bootstrapSelect() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'angular-bootstrap-select.tpl.html',
            scope: {
                options: '=',
                selection: '=',
                onChange: '&',
                multiple: '@'
            },
            link: link
        };

        return ddo;

        function link(scope, elm, attrs) {
            var select = elm.find('select');

            scope.getContent = getContent;

            initDirective();

            function initDirective() {

                scope.$watch('options', refresh);
                scope.$watch('selection', updateSelection);
                select.on('change', modelChanged);

                // multiple selection
                if (attrs.multiple || attrs.multiple === '') {
                    select.attr('multiple', 'true');
                }

                if (attrs.width) {
                    select.attr('width', attrs.width);
                }

            }

            function refresh(newVal) {
                scope.$applyAsync(function () {
                    select.selectpicker('val', scope.selection);
                    select.selectpicker('refresh');
                });
            }

            function updateSelection(newVal, oldVal) {
                scope.$applyAsync(function () {
                    select.selectpicker('val', scope.selection);
                });
            }

            function modelChanged() {
                var newSelection = [];
                var options = select[0].options;
                if (options && options.length) {
                    for (var i = 0; i < options.length; i++) {
                        if (options[i].selected) {
                            newSelection.push(options[i].value);
                        }
                    }
                }
                scope.$applyAsync(function () {
                    scope.selection = newSelection;
                });
            }

            function getContent(content) {
                return content;
            }
        }

    }

})(window, window.angular);