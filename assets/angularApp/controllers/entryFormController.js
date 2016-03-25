angular.module('app')
  .controller('EntryFormController', ['$scope', function($scope) {
    $scope.showJumbo = true;

    $scope.lol = 'lol lol';

    $scope.hideJumbo = function () { $scope.showJumbo = false; };
  }]);
