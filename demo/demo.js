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
                subtext: 'Красный',
                value: 'red',
                content: '<span style="color:red">Красный</span>'
            },
            {
                text: 'Оранжевый',
                value: 'orange'
            },
            {
                text: 'Жёлтый',
                subtext: 'цвет',
                value: 'yellow'
            },
            {
                icon: 'glyphicon glyphicon-envelope',
                subtext: 'Зелёный',
                value: 'green'
            }
        ];

        vm.selection = ['red', 'green'];

        vm.change = function () {
            console.log(vm.selection);
        }
    }

})(window, window.angular);