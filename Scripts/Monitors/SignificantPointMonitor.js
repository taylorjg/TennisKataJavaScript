/**
 * Created by jonathantaylor on 02/03/2014.
 */

(function(){

    "use strict";

    window.tennisKata = window.tennisKata || {};
    window.tennisKata.monitors = window.tennisKata.monitors || {};

    window.tennisKata.monitors.significantPointMonitor = function() {

        var _breakPointEventHandlers = [];
        var _setPointEventHandlers = [];
        var _matchPointEventHandlers = [];

        var _currentSet = function(match) {
            var currentSet = null;
            match.iterateSets(function(s) {
                currentSet = s;
            });
            return currentSet;
        };

        var _currentGame = function(currentSet) {
            var currentGame = null;
            if (currentSet) {
                currentSet.iterateGames(function(g) {
                    currentGame = g;
                });
            }
            return currentGame;
        };

        var _onPointWon = function(match /*, point */) {

            var currentSet = _currentSet(match);
            var currentGame = _currentGame(currentSet);

            if (currentGame && !currentGame.getGameWinner()) {

                var serverSets;
                var receiverSets;
                var serverGames;
                var receiverGames;
                var serverPoints;
                var receiverPoints;
                var server;
                var receiver;

                if (currentGame.extendedProperties.getServer() === match.getPlayer1()) {
                    serverSets = match.getPlayer1Sets();
                    receiverSets = match.getPlayer2Sets();
                    serverGames = currentSet.getPlayer1Games();
                    receiverGames = currentSet.getPlayer2Games();
                    serverPoints = currentGame.getPlayer1Points();
                    receiverPoints = currentGame.getPlayer2Points();
                    server = match.getPlayer1();
                    receiver = match.getPlayer2();
                }
                else {
                    serverSets = match.getPlayer2Sets();
                    receiverSets = match.getPlayer1Sets();
                    serverGames = currentSet.getPlayer2Games();
                    receiverGames = currentSet.getPlayer1Games();
                    serverPoints = currentGame.getPlayer2Points();
                    receiverPoints = currentGame.getPlayer1Points();
                    server = match.getPlayer2();
                    receiver = match.getPlayer1();
                }

                var minSetsToWin = (match.getMatchLength() + 1) / 2;
                var minSetsToWinLessOne = minSetsToWin - 1;
                var serverPointsDifference = serverPoints - receiverPoints;
                var receiverPointsDifference = receiverPoints - serverPoints;
                var setPoint = false;

                if (serverPoints >= 3 && serverPoints > receiverPoints) {
                    if (currentGame.isTieBreakGame()) {
                        if (serverPoints >= 6 && serverPoints > receiverPoints) {
                            setPoint = true;
                        }
                    }
                    else {
                        if (serverGames >= 5 && serverGames > receiverGames) {
                            setPoint = true;
                        }
                    }
                    if (setPoint) {
                        if (serverSets === minSetsToWinLessOne) {
                            _raiseMatchPointEvent(serverPointsDifference, server);
                            return;
                        }
                        _raiseSetPointEvent(serverPointsDifference, server);
                        return;
                    }
                }

                if (receiverPoints >= 3 && receiverPoints > serverPoints) {
                    if (currentGame.isTieBreakGame()) {
                        if (receiverPoints >= 6 && receiverPoints > serverPoints) {
                            setPoint = true;
                        }
                    }
                    else {
                        if (receiverGames >= 5 && receiverGames > serverGames) {
                            setPoint = true;
                        }
                    }
                    if (setPoint) {
                        if (receiverSets === minSetsToWinLessOne) {
                            _raiseMatchPointEvent(receiverPointsDifference, receiver);
                            return;
                        }
                        _raiseSetPointEvent(receiverPointsDifference, receiver);
                        return;
                    }
                }

                if (serverPoints >= 3 && serverPoints > receiverPoints) {
                    // game point to the server
                    return;
                }

                if (receiverPoints >= 3 && receiverPoints > serverPoints) {
                    _raiseBreakPointEvent(receiverPointsDifference, receiver);
                }
            }
        };

        var _onGameWon = function(/* match, game */) {
        };

        var _onSetWon = function(/* match, set */) {
        };

        var _onMatchWon = function(/* match */) {
        };

        var _onNewPoint = function(/* match, point */) {
        };

        var _onNewGame = function(/* match, game */) {
        };

        var _onNewSet = function(/* match, set */) {
        };

        var _init = function(/* match */) {
        };

        var _reset = function(/* match */) {
            _init();
        };

        var _raiseBreakPointEvent = function(breakPoints, receiver) {
            for (var i = 0; i < _breakPointEventHandlers.length; i++) {
                _breakPointEventHandlers[i](breakPoints, receiver);
            }
        };

        var _raiseSetPointEvent = function(setPoints, receiver) {
            for (var i = 0; i < _setPointEventHandlers.length; i++) {
                _setPointEventHandlers[i](setPoints, receiver);
            }
        };

        var _raiseMatchPointEvent = function(matchPoints, receiver) {
            for (var i = 0; i < _matchPointEventHandlers.length; i++) {
                _matchPointEventHandlers[i](matchPoints, receiver);
            }
        };

        var _addBreakPointEventHandler = function (handler) {
            _breakPointEventHandlers.push(handler);
        };

        var _addSetPointEventHandler = function (handler) {
            _setPointEventHandlers.push(handler);
        };

        var _addMatchPointEventHandler = function (handler) {
            _matchPointEventHandlers.push(handler);
        };

        return {
            onPointWon: _onPointWon,
            onGameWon: _onGameWon,
            onSetWon: _onSetWon,
            onMatchWon: _onMatchWon,
            onNewPoint: _onNewPoint,
            onNewGame: _onNewGame,
            onNewSet: _onNewSet,
            init: _init,
            reset: _reset,
            addBreakPointEventHandler: _addBreakPointEventHandler,
            addSetPointEventHandler: _addSetPointEventHandler,
            addMatchPointEventHandler: _addMatchPointEventHandler
        };
    };
}());
