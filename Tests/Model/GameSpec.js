/**
 * Created by taylojo on 03/03/14.
 */

(function(){

    "use strict";

    var _player1;
    var _player2;

    beforeEach(function() {
        _player1 = window.tennisKata.model.player("Azarenka");
        _player2 = window.tennisKata.model.player("Wozniacki");
    });

    describe("Game tests", function() {

        it_multiple(
            "works",
            function(numPoints1, numPoints2, isTieBreak, hasWinner) {

                var monitor = window.tennisKata.monitors.nullMonitor();
                var game = window.tennisKata.model.game(_player1, _player2, isTieBreak, monitor);

                for (var i = 1; i <= Math.max(numPoints1, numPoints2); i++) {
                    if (numPoints1 >= i) { game.scorePoint(window.tennisKata.model.point(_player1)); }
                    if (numPoints2 >= i) { game.scorePoint(window.tennisKata.model.point(_player2)); }
                }

                expect(game.getPlayer1Points()).toBe(numPoints1);
                expect(game.getPlayer2Points()).toBe(numPoints2);
                if (hasWinner) {
                    expect(game.getGameWinner()).not.toBeNull();
                }
                else {
                    expect(game.getGameWinner()).toBeNull();
                }
            },
            [
                [0, 0, false, false],
                [2, 3, false, false],
                [5, 5, false, false],
                [4, 0, false, true],
                [6, 4, false, true],
                [6, 4, true, false],
                [7, 3, true, true]
            ]
        );
    });
}());
