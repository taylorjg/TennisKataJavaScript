/**
 * Created by jonathantaylor on 23/02/2014.
 */

(function(){

    "use strict";

    window.tennisKata = window.tennisKata || {};
    window.tennisKata.model = window.tennisKata.model || {};

    window.tennisKata.model.match = function(player1, player2, matchLength, monitor) {

        var _player1 = player1;
        var _player2 = player2;
        var _matchLength = matchLength;
        var _monitor = monitor;
        var _sets = [];
        var _matchWinner = null;

        var _getPlayer1 = function() {
            return _player1;
        };

        var _getPlayer2 = function() {
            return _player2;
        };

        var _getMatchLength = function() {
            return _matchLength;
        };

        var _newSet = function() {
            var isFinalSet = (_sets.length === (_matchLength - 1));
            var newSet = window.tennisKata.model.set(_player1, _player2, isFinalSet, _monitor);
            _monitor.onNewSet(newSet);
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

//        var _currentGame = function() {
//            var currentGame = null;
//            var currentSet = _currentSet();
//            if (currentSet) {
//                currentGame = currentSet.getCurrentGame();
//            }
//            return currentGame;
//        };

        var _scorePoint = function(point) {
            // TODO: throw if !!_matchWinner
            var currentSet = _currentSet();
            currentSet.scorePoint(point);
            if (_getMatchWinner()) {
                _monitor.onMatchWon(this);
            }
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
                return x1[0].getSetWinner();
            }
            if (x2len >= minSetsToWin) {
                return x2[0].getSetWinner();
            }
            return null;
        };

        var _getMatchWinner = function() {
            if (_matchWinner === null) {
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
            getPlayer1: _getPlayer1,
            getPlayer2: _getPlayer2,
            getPlayer1Sets: _getPlayer1Sets,
            getPlayer2Sets: _getPlayer2Sets,
            getMatchLength: _getMatchLength,
            getMatchWinner: _getMatchWinner,
            //getCurrentSet: _currentSet,
            //getCurrentGame: _currentGame,
            scorePoint: _scorePoint,
            iterateSets: _iterateSets,
            reset: _reset,
            extendedProperties: {}
        };
    };
}());
