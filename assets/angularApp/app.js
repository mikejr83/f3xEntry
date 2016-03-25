var app = angular.module('app', ['ngStorage', 'ngTable', 'mgcrea.ngStrap'])
  .constant('CONTEST_TYPES', [
    {
      name: 'F3J/TD',
      type: 'f3j'
    },
    {
      name: 'F3B',
      type: 'f3b'
    },
    {
      name: 'F3K',
      type: 'f3k'
    }
  ])
  .constant('PILOT_CLASSES', [

  ])
  .constant('PILOT_FREQ', [
    '2.4GHz',
    '72MHz',
    'Other'
  ]);
