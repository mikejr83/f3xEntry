angular.module('app')
  .controller('EntryFormController', ['$scope', 'CONTEST_TYPES', function($scope, contestTypes) {
    $scope.showJumbo = true;
    $scope.contestTypes = contestTypes;

    $scope.lol = 'lol lol';

    $scope.hideJumbo = function () { $scope.showJumbo = false; };
  }]);
