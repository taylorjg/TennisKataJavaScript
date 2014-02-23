/**
 * Created by jonathantaylor on 23/02/2014.
 */

(function(){

    "use strict";

    window.tennisKata = window.tennisKata || {};
    window.tennisKata.model = window.tennisKata.model || {};

    window.tennisKata.model.match = function(player1, player2, initialServer, matchLength) {

        var _player1 = player1;
        var _player2 = player2;
        var _initialServer = initialServer;
        var _matchLength = matchLength;
        var _sets = [];
        var _matchWinner = null;

        var _determineInitialServerForNewSet = function() {

            if (_sets.length === 0) {
                return _initialServer;
            }

            var lastSet = _sets[_sets.length - 1];
            var lastServer = lastSet.getLastServer();
            return (lastServer === _player1) ? _player2 : _player1;
        };

        var _newSet = function() {
            var initialServerForNewSet = _determineInitialServerForNewSet();
            var isFinalSet = (_sets.length === (_matchLength - 1));
            var newSet = window.tennisKata.model.set(_player1, _player2, initialServerForNewSet, isFinalSet);
            _sets.push(newSet);
            return newSet;
        };

        var _currentSet = function() {
            if (_sets.length) {
                var last = _sets[_sets.length - 1];
                if (!last.getSetWinner()) {
                    return last;
                }
            }
            return _newSet();
        };

        var _scorePoint = function(point) {
            // TODO: throw if !!_matchWinner
            var currentSet = _currentSet();
            currentSet.scorePoint(point);
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

        var _getPlayer1Sets = function() {
            return _countSets(_player1);
        };

        var _getPlayer2Sets = function() {
            return _countSets(_player2);
        };

        var _partitionSets = function() {
            return window.tennisKata.model.utils.partition(
                _sets,
                function(set){
                    return set.getSetWinner();
                });
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

        var _iterateSets = function(fn) {
            for (var i = 0; i < _sets.length; i++) {
                fn(_sets[i]);
            }
        };

        var _reset = function() {
            _sets = [];
            _matchWinner = null;
        };

        return {
            scorePoint: _scorePoint,
            getPlayer1Sets: _getPlayer1Sets,
            getPlayer2Sets: _getPlayer2Sets,
            getMatchWinner: _getMatchWinner,
            iterateSets: _iterateSets,
            reset: _reset
        };
    };
}());
