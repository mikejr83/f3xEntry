angular.module('app')
  .controller('EntryFormController', ['$scope', '$log', '$localStorage', 'CONTEST_TYPES', function($scope, $log, $localStorage, contestTypes) {
    $scope.$storage = $localStorage.$default({
      contests: [
        {
          name: null,
          startDate: new Date(),
          endDate: new Date(),
          contestTypes: contestTypes[0]
        }
      ]
    });

    $scope.showJumbo = true;
    $scope.contestTypes = contestTypes;
    $scope.selectedContest = $scope.$storage.contests[0];

    $scope.lol = 'lol lol';

    $scope.hideJumbo = function () { $scope.showJumbo = false; };
  }]);
