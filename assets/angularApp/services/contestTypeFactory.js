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
