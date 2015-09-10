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
                data: '=',
                selection: '=',
                changeCallback: '&',
                multiple: '@',
                simple: '@',
            },
            link: link
        };

        return ddo;

        function link(scope, elm, attrs) {
            var select = elm.find('select');
            var isSimple;

            initDirective();

            function initDirective() {

                scope.optgroups = [];

                scope.$watch('data', dataChanged);

                // selection changed outside
                scope.$watch('selection', updateSelection);
                // selection changed on select element
                select.on('change', selectionChanged);

                scope.on('$destroy', function(){
                    select.selectpicker('destroy');
                    select.off('change', selectionChanged);
                });

                // multiple selection
                if (attrs.multiple || attrs.multiple === '') {
                    select.attr('multiple', 'true');
                }

                if (attrs.width) {
                    select.attr('width', attrs.width);
                }

                if (attrs.title) {
                    select.attr('title', attrs.title);
                }

                if (attrs.mobile) {
                    select.selectpicker('mobile');
                }

                isSimple = attrs.simple || attrs.simple === '';
            }

            function dataChanged(newVal) {
                if (isSimple) {
                    scope.optgroups.length = 0;
                    scope.optgroups.push({
                        label: '',
                        options: newVal
                    });
                } else {
                    scope.optgroups.length = 0;
                    newVal.forEach(function(v){
                        scope.optgroups.push(v);
                    });
                }

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

            function selectionChanged() {
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
        "<select class=\"selectpicker\">\n    <optgroup ng-repeat=\"optgroup in optgroups\" label=\"{{ optgroup.label }}\">\n        <option ng-repeat=\"option in optgroup.options\"\n                ng-bind=\"option.text\"\n                ng-attr-data-content=\"{{ option.content }}\"\n                ng-attr-data-subtext=\"{{ option.subtext }}\"\n                ng-attr-data-icon=\"{{ option.icon }}\"\n                value=\"{{ option.value }}\">\n        </option>\n    </optgroup>\n</select>");
}]);