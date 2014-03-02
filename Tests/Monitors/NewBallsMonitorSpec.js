/**
 * Created by jonathantaylor on 01/03/2014.
 */

(function(){

    "use strict";

    describe("NewBallsMonitor tests", function() {

        var _newBallsMonitor;

        beforeEach(function() {
            _newBallsMonitor = window.tennisKata.monitors.newBallsMonitor();
        });

        it_multiple(
            "raises the newBalls event at the correct time",
            function(numGames, numEventsExpected) {
                var numEventsRaised = 0;
                _newBallsMonitor.addNewBallsEventHandler(function() {
                    numEventsRaised++;
                });
                for (var i = 0; i < numGames; i++) {
                    _newBallsMonitor.onGameWon(null, null);
                }
                expect(numEventsRaised).toBe(numEventsExpected);
            },
            [
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
                [4, 0],
                [5, 0],
                [6, 0],
                [7, 1],
                [8, 1],
                [9, 1],
                [10, 1],
                [11, 1],
                [12, 1],
                [13, 1],
                [14, 1],
                [15, 1],
                [16, 2],
                [17, 2],
                [18, 2],
                [19, 2],
                [20, 2],
                [21, 2],
                [22, 2],
                [23, 2],
                [24, 2],
                [25, 3],
                [26, 3]
            ]);
    });
}());
