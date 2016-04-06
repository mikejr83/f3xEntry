angular.module('app')
  .controller('EntryFormController', ['$scope', '$log', '$templateCache', '$localStorage', 'contestTypeFactory', 'PILOT_CLASSES', 'PILOT_FREQ', 'F3K_ROUND_TYPES', function ($scope, $log, $templateCache, $localStorage, contestTypeFactory, pilotClasses, pilotFreqs, f3kRoundTypes) {
    var contestTypes = contestTypeFactory.loadContestTypes(),
      roundIndex = 0;

    console.log('angularApp/templates/f3kscores.html', $templateCache.get('angularApp/templates/f3kscores.html'));

    console.log('$templateCache', $templateCache)

    $scope.$storage = $localStorage.$default({
      contests: [
        {
          name: null,
          startDate: new Date(),
          endDate: new Date(),
          contestType: contestTypes[0],
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
    $scope.selectedRound = $scope.selectedContest.rounds[roundIndex];

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

    $scope.addRound = function (contestType) {
      if (!$scope.selectedContest.rounds) {
        $scope.selectedContest.rounds = [];
      }

      var round = {
        number: $scope.selectedContest.rounds.length + 1,
        //        target: 0,
        //        pilots: _.clone($scope.selectedContest.pilots)
      };

      switch (contestType.key) {
      case 'f3j':
        round.target = 0;

        break;

      case 'f3k':
        round.type = $scope.f3kRoundTypes[0];
        break;
      }

      $scope.selectedContest.rounds.push(round);

      if ($scope.selectedContest.rounds.length == 1) {
        $scope.selectedRound = $scope.selectedContest.rounds[0]
      }
    };

    $scope.removeRound = function () {

    };

    $scope.exportContest = function () {
      $log.debug('Exporting contest', $scope.selectedContest);
      var contestType = _.where(contestTypes, {
        key: $scope.selectedContest.contestType.key
      });

      if (contestType && contestType.length == 1) {
        contestType[0].export($scope.selectedContest);
      }
    };

    $scope.exportRawContest = function () {
      contestTypeFactory.downloadJSON('rawOutput.json', JSON.stringify($scope.selectedContest, null, 2));
    };

    $scope.nextRound = function () {
      if (roundIndex < $scope.selectedContest.rounds.length - 1) {
        roundIndex++;
      }
      $scope.selectedRound = $scope.selectedContest.rounds[roundIndex];
    };

    $scope.previousRound = function () {
      if (roundIndex > 0) {
        roundIndex--;
      }
      $scope.selectedRound = $scope.selectedContest.rounds[roundIndex];
    }
  }]);
