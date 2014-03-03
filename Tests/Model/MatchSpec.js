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

    describe("Match tests", function() {

        it("works", function() {

            var monitor = window.tennisKata.monitors.nullMonitor();
            var match = window.tennisKata.model.match(_player1, _player2, 3, monitor);
            var player1Point = window.tennisKata.model.point(_player1);

            for (var i = 1; i <= 12; i++) {
                match.scorePoint(player1Point);
                match.scorePoint(player1Point);
                match.scorePoint(player1Point);
                match.scorePoint(player1Point);
            }

            match.iterateSets(function(set) {
                expect(set.getSetWinner()).toBe(_player1);
            });

            expect(match.getMatchWinner()).toBe(_player1);
        });
    });
}());
