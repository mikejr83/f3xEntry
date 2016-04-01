var app = angular.module('app', ['ngStorage', 'ngTable', 'mgcrea.ngStrap', 'ui.mask'])
  .constant('PILOT_CLASSES', [
    'Expert',
    'Sportsman'
  ])
  .constant('PILOT_FREQ', [
    '2.4GHz',
    '72MHz',
    'Other'
  ])
  .constant('F3K_ROUND_TYPES', [
    {
      name: 'A',
      description: 'Last flight'
    },
    {
      name: 'B',
      description: 'Next to last and last flight'
    },
    {
      name: 'C',
      description: 'All up, last down, seconds'
    },
    {
      name: 'D',
      description: 'Increasing time by 15 seconds'
    },
    {
      name: 'E',
      description: 'Poker - variable target time'
    },
    {
      name: 'F',
      description: '3 out of 6'
    },
    {
      name: 'G',
      description: 'Five longest flights'
    },
    {
      name: 'H',
      description: 'One, two, three and four minute flights, any order'
    },
    {
      name: 'I',
      description: 'Three longest flights'
    },
    {
      name: 'J',
      description: 'Three last flights'
    }
  ]);
