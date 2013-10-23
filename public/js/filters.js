'use strict';

angular.module('calendar.filters', [])
    .filter( 'getName', [ '$rootScope', function( $rootScope ) {
        return function( num ) {
            var realNum = num - 1;
            return $rootScope.utils.staticData[ realNum ];
        };
    }]);
