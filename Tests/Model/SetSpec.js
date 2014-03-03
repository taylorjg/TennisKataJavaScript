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

    describe("Set tests", function() {

        it_multiple(
            "works",
            function(numGames1, numGames2, hasWinner) {

                var monitor = window.tennisKata.monitors.nullMonitor();
                var set = window.tennisKata.model.set(_player1, _player2, false, monitor);

                for (var i = 1; i <= Math.max(numGames1, numGames2); i++) {
                    if (numGames1 >= i) {
                        set.scorePoint(window.tennisKata.model.point(_player1));
                        set.scorePoint(window.tennisKata.model.point(_player1));
                        set.scorePoint(window.tennisKata.model.point(_player1));
                        set.scorePoint(window.tennisKata.model.point(_player1));
                    }
                    if (numGames2 >= i) {
                        set.scorePoint(window.tennisKata.model.point(_player2));
                        set.scorePoint(window.tennisKata.model.point(_player2));
                        set.scorePoint(window.tennisKata.model.point(_player2));
                        set.scorePoint(window.tennisKata.model.point(_player2));
                    }
                }

                expect(set.getPlayer1Games()).toBe(numGames1);
                expect(set.getPlayer2Games()).toBe(numGames2);
                if (hasWinner) {
                    expect(set.getSetWinner()).not.toBeNull();
                }
                else {
                    expect(set.getSetWinner()).toBeNull();
                }
                set.iterateGames(function(g) {
                    expect(g.getGameWinner()).not.toBeNull();
                });
            },
            [
                [0, 0, false],
                [2, 3, false],
                [6, 0, true],
                [2, 5, false],
                [2, 6, true],
                [6, 6, false]
            ]
        );

        it("handles a tie break correctly", function() {

            var monitor = window.tennisKata.monitors.nullMonitor();
            var set = window.tennisKata.model.set(_player1, _player2, false, monitor);

            for (var i = 1; i <= 6; i++) {

                set.scorePoint(window.tennisKata.model.point(_player1));
                set.scorePoint(window.tennisKata.model.point(_player1));
                set.scorePoint(window.tennisKata.model.point(_player1));
                set.scorePoint(window.tennisKata.model.point(_player1));

                set.scorePoint(window.tennisKata.model.point(_player2));
                set.scorePoint(window.tennisKata.model.point(_player2));
                set.scorePoint(window.tennisKata.model.point(_player2));
                set.scorePoint(window.tennisKata.model.point(_player2));
            }

            expect(set.getPlayer1Games()).toBe(6);
            expect(set.getPlayer2Games()).toBe(6);

            set.scorePoint(window.tennisKata.model.point(_player1));
            set.scorePoint(window.tennisKata.model.point(_player1));
            set.scorePoint(window.tennisKata.model.point(_player1));
            set.scorePoint(window.tennisKata.model.point(_player1));

            set.scorePoint(window.tennisKata.model.point(_player2));
            set.scorePoint(window.tennisKata.model.point(_player2));
            set.scorePoint(window.tennisKata.model.point(_player2));
            set.scorePoint(window.tennisKata.model.point(_player2));
            set.scorePoint(window.tennisKata.model.point(_player2));
            set.scorePoint(window.tennisKata.model.point(_player2));
            set.scorePoint(window.tennisKata.model.point(_player2));

            expect(set.getPlayer1Games()).toBe(6);
            expect(set.getPlayer2Games()).toBe(7);
            expect(set.getSetWinner()).toBe(_player2);

            var lastGame;
            set.iterateGames(function(g){lastGame = g;});
            expect(lastGame.getPlayer1Points()).toBe(4);
            expect(lastGame.getPlayer2Points()).toBe(7);
            expect(lastGame.getGameWinner()).toBe(_player2);
        });
    });
}());
