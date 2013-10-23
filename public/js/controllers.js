'use strict';

angular.module('calendar.controllers', [ 'angular-underscore' ])
    .controller('PanelController', [ '$rootScope', '$scope', '$http', '$routeParams', '$location', 'Year', '_', 'DataService'
     , function( $rootScope, $scope, $http, $routeParams, $location, Year, _, DataService ) {
        $scope._ = _;
        $scope.$location = $location;
        $scope.state = false;
        $scope.toggleCalendar = incopsulation();
        $scope.months = DataService.getMonths();
        $scope.currentMonth = DataService.month;
        $scope.currentYear  = DataService.year;

        Year.query({ url : 'years.json' })
            .then( function ( response ){
                $scope.years = response.data;
                $scope.hasSiblings = function( option ){
                    if ( option.index == 'first' ){
                        if ( ( this.choozenYear || this.currentYear ) != option.konina[ 0 ][ 'name' ] ){
                            return true;
                        }
                    } else if  ( option.index == 'last' ){
                        if ( ( this.choozenYear || this.currentYear ) != option.konina[ option.konina.length - 1 ][ 'name' ] ){
                            return true;
                        }
                    }
                    return false;
                }
            });

        $scope.showYear = function () {
            var yearId = this.choozenYear !== undefined ? this.choozenYear : $routeParams[ 'yearId' ]
              , promise = DataService.getCalendar( yearId + '.json' );

            promise.then( function(){
                $scope.gottedYear = $rootScope.utils.preparedData;
            });
        };


        $scope.getprev = function(){
            var _year = parseInt( $scope.choozenYear, 10 ) || $scope.currentYear
              , prevYear
              , promise
              ;

            _.each( $scope.years, function ( year, index ){
                if ( year.name == _year ){
                    if ( index == 0 ){
                        return false;
                    } else {
                        prevYear = $scope.years[ index - 1 ];
                    }
                }
            });

            if ( prevYear ){
                promise = DataService.getCalendar( prevYear['name'] + '.json' );
                promise.then( function(){
                    $scope.gottedYear = $rootScope.utils.preparedData;
                });
                this.choozenYear = prevYear['name'];
            } else {
                return false;
            }
        }
        $scope.getNext = function(){
            var _year = parseInt( $scope.choozenYear, 10 ) || $scope.currentYear
              , nextYear
              , promise
              ;

            _.each( $scope.years, function ( year, index ){
                if ( year.name == _year ){
                    if ( index == ( $scope.years.length - 1 ) ){
                        return false;
                    } else {
                        nextYear = $scope.years[ index + 1 ];
                    }
                }
            });

            if ( nextYear ){
                promise = DataService.getCalendar( nextYear['name'] + '.json' );
                promise.then( function(){
                    $scope.gottedYear = $rootScope.utils.preparedData;
                });
                this.choozenYear = nextYear['name'];
            } else {
                return false;
            }
        }


        /* Helpers */
        function incopsulation () {
            var count = 0;
            return function(){
                count += 1;
                $scope.state = Boolean( (count/2) % 1 );
            };
        }
    }])
    .controller('InitController', [ '$scope', 'DataService'
     , function( $scope, DataService ) {
        $scope.currentYear = DataService.year;
    }]);