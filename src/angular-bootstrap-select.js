// directive to data communication with bootstrap selectors
(function (window, angular, undefined) {
    'use strict';

    angular
        .module('angular-bootstrap-select', [])
        .directive('bootstrapSelect', bootstrapSelect);

    bootstrapSelect.$inject = [];

    function bootstrapSelect() {
        return {
            restrict: 'AE',
            templateUrl: 'angular-bootstrap-select.tpl.html',
            scope: {
                options: '=',
                selection: '=',
                changeCallback: '&',
                multiple: '@',
                simple: '@'
            },
            link: link
        };

        function link(scope, elm, attrs) {
            var isSimple;

            initDirective();

            function initDirective() {

                scope.optgroups = [];

                scope.$watch('options', optionsChanged);

                // selection changed outside
                scope.$watch('selection', updateSelection);
                // selection changed on select element
                elm.on('change', selectionChanged);

                scope.$on('$destroy', function(){
                    elm.selectpicker('destroy');
                    elm.off('change', selectionChanged);
                });

                // multiple selection
                if (attrs.multiple || attrs.multiple === '') {
                    elm.attr('multiple', 'true');
                }

                if (attrs.width) {
                    elm.attr('width', attrs.width);
                }

                if (attrs.title) {
                    elm.attr('title', attrs.title);
                }

                if (attrs.mobile) {
                    elm.selectpicker('mobile');
                }

                isSimple = attrs.simple || attrs.simple === '';
            }

            function optionsChanged(newVal) {
                if (isSimple) {
                    scope.optgroups.length = 0;
                    scope.optgroups.push({
                        label: '',
                        options: newVal
                    });
                } else {
                    scope.optgroups.length = 0;
                    (newVal || []).forEach(function(v){
                        scope.optgroups.push(v);
                    });
                }

                scope.$applyAsync(function () {
                    elm.selectpicker('refresh');
                });
            }

            function updateSelection() {
                scope.$applyAsync(function () {
                    elm.selectpicker('val', scope.selection);
                    scope.changeCallback();
                });
            }

            function selectionChanged() {
                var newSelection = [];
                var options = elm[0].options;
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