/**
 * Created by jonathantaylor on 27/02/2014.
 */

(function(){

    "use strict";

    window.tennisKata = window.tennisKata || {};
    window.tennisKata.presentation = window.tennisKata.presentation || {};

    window.tennisKata.presentation.previousSetsFormatter = function() {

        var _formatPreviousSets = function(match) {

            var player1Set1Games = "";
            var player2Set1Games = "";
            var player1Set2Games = "";
            var player2Set2Games = "";
            var player1Set3Games = "";
            var player2Set3Games = "";
            var player1Set4Games = "";
            var player2Set4Games = "";

            var setNumber = 1;

            match.iterateSets(function(set) {
                if (set.getSetWinner() && !set.isFinalSet()) {

                    switch (setNumber) {
                        case 1:
                            player1Set1Games = set.getPlayer1Games().toString();
                            player2Set1Games = set.getPlayer2Games().toString();
                            break;

                        case 2:
                            player1Set2Games = set.getPlayer1Games().toString();
                            player2Set2Games = set.getPlayer2Games().toString();
                            break;

                        case 3:
                            player1Set3Games = set.getPlayer1Games().toString();
                            player2Set3Games = set.getPlayer2Games().toString();
                            break;

                        case 4:
                            player1Set4Games = set.getPlayer1Games().toString();
                            player2Set4Games = set.getPlayer2Games().toString();
                            break;
                    }

                    setNumber++;
                }
            });

            return {
                player1Set1Games: player1Set1Games,
                player2Set1Games: player2Set1Games,
                player1Set2Games: player1Set2Games,
                player2Set2Games: player2Set2Games,
                player1Set3Games: player1Set3Games,
                player2Set3Games: player2Set3Games,
                player1Set4Games: player1Set4Games,
                player2Set4Games: player2Set4Games
            };
        };

        return {
            formatPreviousSets: _formatPreviousSets
        };
    };
}());
