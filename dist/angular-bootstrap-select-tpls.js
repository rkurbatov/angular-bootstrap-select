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
                changeCallback: '&',
                multiple: '@'
            },
            link: link
        };

        return ddo;

        function link(scope, elm, attrs) {
            var select = elm.find('select');

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
                    select.selectpicker('refresh');
                });
            }

            function updateSelection(newVal, oldVal) {
                scope.$applyAsync(function () {
                    select.selectpicker('val', scope.selection);
                    scope.changeCallback();
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
        }

    }

})(window, window.angular);
angular.module('angular-bootstrap-select').run(['$templateCache', function($templateCache) {
    $templateCache.put('angular-bootstrap-select.tpl.html',
        "<select class=\"selectpicker\">\n    <option ng-repeat=\"option in options\"\n            ng-bind=\"option.text\"\n            ng-attr-data-content=\"{{ option.content }}\"\n            ng-attr-data-subtext=\"{{ option.subtext }}\"\n            ng-attr-data-icon=\"{{ option.icon }}\"\n            value=\"{{ option.value }}\">\n    </option>\n</select>");
}]);