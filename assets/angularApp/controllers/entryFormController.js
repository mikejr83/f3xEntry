angular.module('app')
  .controller('EntryFormController', ['$scope', '$log', '$localStorage', 'contestTypeFactory', 'PILOT_CLASSES', 'PILOT_FREQ', 'F3K_ROUND_TYPES', function ($scope, $log, $localStorage, contestTypeFactory, pilotClasses, pilotFreqs, f3kRoundTypes) {
    var contestTypes = contestTypeFactory.loadContestTypes();

    $scope.$storage = $localStorage.$default({
      contests: [
        {
          name: null,
          startDate: new Date(),
          endDate: new Date(),
          contestType: contestTypes,
          pilots: [],
          rounds: []
        }
      ],
      showPilots: true,
      classes: _.clone(pilotClasses)
    });

    $scope.maskUIOptions = {
      maskDefinitions: {
        '9': /\d/,
        '5': /[0-5]/,
        '1': /1/
      }
    };

    $scope.showJumbo = true;

    $scope.contestTypes = contestTypes;
    $scope.pilotClasses = pilotClasses;
    $scope.pilotFreqs = pilotFreqs;
    $scope.f3kRoundTypes = f3kRoundTypes;

    $scope.selectedContest = $scope.$storage.contests[0];
    $scope.selectedRoundType = $scope.f3kRoundTypes[0];

    $scope.hideJumbo = function () {
      $scope.showJumbo = false;
    };
    $scope.togglePilots = function () {
      $scope.$storage.showPilots = !$scope.$storage.showPilots;
    };

    $scope.addPilot = function () {
      if (!$scope.selectedContest.pilots) {
        $scope.selectedContest.pilots = [];
      }
      $scope.selectedContest.pilots.push({
        name: null,
        class: pilotClasses[0],
        class: pilotFreqs[0]
      });
    };

    $scope.removePilot = function (pilotToRemove) {
      _.remove($scope.selectedContest.pilots, function (pilot) {
        return pilotToRemove === pilot;
      });
    };

    $scope.addRound = function () {
      if (!$scope.selectedContest.rounds) {
        $scope.selectedContest.rounds = [];
      }

      $scope.selectedContest.rounds.push({
        number: $scope.selectedContest.rounds.length + 1,
        target: 0,
        pilots: _.clone($scope.selectedContest.pilots)
      });
    };

    $scope.exportContest = function () {
      $log.debug('Exporting contest', $scope.selectedContest);
      var contestType = _.where(contestTypes, {key: $scope.selectedContest.contestType.key});

      if (contestType && contestType.length == 1) {
        contestType[0].export($scope.selectedContest);
      }
    };

    $scope.exportRawContest = function () {
      contestTypeFactory.downloadJSON('rawOutput.json', JSON.stringify($scope.selectedContest, null, 2));
    }
  }]);
