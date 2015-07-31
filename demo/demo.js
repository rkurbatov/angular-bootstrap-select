(function(window, angular, undefined){
    'use strict';

    angular
        .module('absDemo', [
            'angular-bootstrap-select'
        ])
        .controller('absDemoCtrl', absDemoController);

    function absDemoController() {
        var vm = this;

        vm.options = [
            {
                label: 'Красный',
                value: 'red',
                content: '<span style="color:red">Красный</span>'
            },
            {
                label: 'Оранжевый',
                value: 'orange'
            },
            {
                label: 'Жёлтый',
                value: 'yellow'
            },
            {
                label: 'Зелёный',
                value: 'green'
            }
        ];

        vm.selection = ['red', 'green'];
    }

})(window, window.angular);