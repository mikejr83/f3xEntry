var app = angular.module('app', ['ngStorage', 'ngTable', 'mgcrea.ngStrap', 'ui.mask'])
  .constant('PILOT_CLASSES', [
    'Expert',
    'Sportsman'
  ])
  .constant('PILOT_FREQ', [
    '2.4GHz',
    '72MHz',
    'Other'
  ]);
