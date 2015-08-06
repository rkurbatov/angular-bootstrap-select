(function (window, angular, undefined) {
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

        vm.complex = [
            {label: 'first', options: vm.options},
            {
                label: 'second',
                options: [
                    {text: 'Фиолетовый', value: 'violet'},
                    {icon: 'glyphicon glyphicon-star', subtext: 'звезда', value: 'star'}
                ]
            }
        ];

        vm.selection1 = ['red', 'green'];
        vm.selection2 = ['yellow', 'green'];

        vm.change = function () {
            console.log(vm.selection1);
            console.log(vm.selection2);
        }
    }

})(window, window.angular);