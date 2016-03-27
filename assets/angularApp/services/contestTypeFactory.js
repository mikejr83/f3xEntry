angular.module('app')
  .factory('contestTypeFactory', ['$log', function ($log) {
    function createLineOne(contest) {
      return '0,' + contest.name + ',' + contest.startDate + ',' + contest.endDate + ',' + contest.contestType.key
    }

    function download(filename, text) {
      var pom = document.createElement('a');
      pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      pom.setAttribute('download', filename);

      if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
      } else {
        pom.click();
      }
    }

    function downloadJSON(filename, text) {
      var pom = document.createElement('a');
      pom.setAttribute('href', 'data:application/javascript;charset=utf-8,' + encodeURIComponent(text));
      pom.setAttribute('download', filename);

      if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
      } else {
        pom.click();
      }
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


              var targetTimes = [],
                lineTwo = '';
              _.forEach(contest.rounds, function (round) {
                $log.debug('Target for ' + round.number, round.targetTime);

                targetTimes.push(moment.duration('00:' + round.targetTime));
                lineTwo += round.targetTime + ',';
              });

              lineTwo = lineTwo.substring(0, lineTwo.length - 1);
              $log.debug('Line Two:', lineTwo);

              var pilots = [];
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

                pilots.push('0,' + pilot.name + ',' + pilot.class + ',' + pilot.freq + ',' + pilot.team + ',' + rounds.join(','));
              });

              var lineThree = pilots.join(',');
              $log.debug('Line Three:', lineThree);

              download('f3xEntry.txt', lineOne + '\n' + lineTwo + '\n' + lineThree);
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
      },
      download: download,
      downloadJSON: downloadJSON
    }
  }]);
