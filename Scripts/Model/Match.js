/**
 * Created by jonathantaylor on 23/02/2014.
 */

(function(){

    "use strict";

    window.tennisKata = window.tennisKata || {};
    window.tennisKata.model = window.tennisKata.model || {};

    window.tennisKata.model.match = function(matchLength) {

        var _sets = [];
        var _matchLength = matchLength;
        var _matchWinner = null;

        var _addSet = function(set) {
            // TODO: throw if !!_matchWinner
            _sets.push(set);
        };

        var _getMatchLength = function() {
            return _matchLength;
        };

        var _countSets = function(player) {
            var result = 0;
            for (var i = 0; i < _sets.length; i++) {
                if (_sets[i].getSetWinner() === player) {
                    result += 1;
                }
            }
            return result;
        };

        var _getPlayer1Sets = function(player1) {
            return _countSets(player1);
        };

        var _getPlayer2Sets = function(player2) {
            return _countSets(player2);
        };

        // TODO: extract method
        var _partitionSets = function() {
            var x1 = [];
            var x2 = [];
            for (var i = 0; i < _sets.length; i++) {
                var set = _sets[i];
                if (x1.length) {
                    if (set.getSetWinner() === x1[0].getSetWinner()) {
                        x1.push(set);
                    }
                    else {
                        x2.push(set);
                    }
                }
                else {
                    x1.push(set);
                }
            }
            return [x1, x2];
        };

        var _calculateMatchWinner = function() {
            var minSetsToWin = (_matchLength + 1) / 2;
            var xs = _partitionSets();
            var x1 = xs[0];
            var x2 = xs[1];
            var x1len = x1.length;
            var x2len = x2.length;
            if (x1len >= minSetsToWin) {
                return x1[0].getPointWinner();
            }
            if (x2len >= minSetsToWin) {
                return x2[0].getPointWinner();
            }
            return null;
        };

        var _getMatchWinner = function() {
            if (_matchLength === null) {
                _matchWinner = _calculateMatchWinner();
            }
            return _matchWinner;
        };

        return {
            addSet: _addSet,
            getMatchLength: _getMatchLength,
            getPlayer1Sets: _getPlayer1Sets,
            getPlayer2Sets: _getPlayer2Sets,
            getMatchWinner: _getMatchWinner
        };
    };
}());
