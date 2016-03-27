angular.module('app')
  .factory('contestTypeFactory', ['$log', function ($log) {
    function createLineOne(contest) {
      return '0,' + contest.name + ',' + contest.startDate + ',' + contest.endDate + ',' + contest.contestType.key
    }

    return {
      loadContestTypes: function () {
        return [
          {
            name: 'F3J/TD',
            key: 'f3j',
            export: function (contest) {
              $log.debug('Exporting a F3J/TD contest.');
              var lineOne = createLineOne(contest);
              $log.debug('Line One:', lineOne);


              var targetTimes = [];
              _.forEach(contest.rounds, function(round) {
                $log.debug('Target for ' + round.number, round.targetTime);

                targetTimes.push(moment.duration('00:' + round.targetTime));
              });

              $log.debug('Target times', targetTimes);


              _.forEach(contest.pilots, function (pilot) {

                var rounds = [];
                _.forEach(pilot.rounds, function (round, index) {

                  var pilotRoundTime = moment.duration('00:' + round.time);

                  var group = 1;
                  if (round.group !== undefined && round.group != null) {
                    group = round.group;
                  }

                  var landing = 0;
                  if (round.landing !== undefined && round.landing != null) {
                    landing = parseInt(round.landing, 10);
                  }

                  var over = '';
                  if (pilotRoundTime.asSeconds() > targetTimes[index].asSeconds()) {
                    over = '1';
                  }

                  var penalty = '';
                  if (round.penalty !== undefined && round.penalty != null) {
                    penalty = round.penalty;
                  }

                  rounds.push(group + ',' + pilotRoundTime.minutes() + ',' + pilotRoundTime.seconds() + ',' + landing + ',' + over + ',' + penalty);
                });

                console.log('Rounds', rounds);
              });
            }
        },
          {
            name: 'F3B',
            key: 'f3b',
            export: function () {

            }
      },
          {
            name: 'F3K',
            key: 'f3k',
            export: function () {

            }
      }
    ];
      }
    }
  }]);
