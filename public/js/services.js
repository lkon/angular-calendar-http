'use strict';

/* Services */

angular.module( 'calendar.services', [ 'ngResource', 'angular-underscore' ])
    .factory( 'Year', [ '$http', function ( $http ) {
        return {
            query : function( option ){
                var config = {
                        method : 'GET'
                      , url    : '/app/json'
                    }
                  , url
                  ;
                if ( option && option.url && option.url.length > 0 ){
                    config.url = config.url + '/' + option.url;
                }

                return $http( config );
            }
        };
    }]);
