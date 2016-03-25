angular.module('app')
  .controller('EntryFormController', ['$scope', '$log', '$localStorage', 'CONTEST_TYPES', 'PILOT_CLASSES', 'PILOT_FREQ', function ($scope, $log, $localStorage, contestTypes, pilotClasses, pilotFreqs) {
    $scope.$storage = $localStorage.$default({
      contests: [
        {
          name: null,
          startDate: new Date(),
          endDate: new Date(),
          contestTypes: contestTypes[0],
          pilots: []
        }
      ],
      showPilots: true
    });

    $scope.showJumbo = true;

    $scope.contestTypes = contestTypes;
    $scope.pilotClasses = pilotClasses;
    $scope.pilotFreqs = pilotFreqs;

    $scope.selectedContest = $scope.$storage.contests[0];

    $scope.lol = 'lol lol';

    $scope.hideJumbo = function () {
      $scope.showJumbo = false;
    };
    $scope.togglePilots = function () {
      $scope.$storage.showPilots = !$scope.$storage.showPilots;
    };

    $scope.addPilot = function () {
      $scope.selectedContest.pilots.push({
        name: null
      });
    };
  }]);
