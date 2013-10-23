'use strict';

// Declare app level module which depends on filters, and services
window.calendar = angular.module(
    'calendar'
    , [
        'underscore'
      , 'angular-underscore'

      , 'ngRoute'
      , 'ngAnimate'

      , 'calendar.controllers'
      , 'calendar.services'
      , 'calendar.utils'
      , 'calendar.directives'
      , 'calendar.filters'
    ]
);
