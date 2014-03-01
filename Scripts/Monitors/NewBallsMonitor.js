/**
 * Created by jonathantaylor on 01/03/2014.
 */

(function(){

    "use strict";

    window.tennisKata = window.tennisKata || {};
    window.tennisKata.monitors = window.tennisKata.monitors || {};

    window.tennisKata.monitors.newBallsMonitor = function() {

        var _gameCount = 0;
        var _newBallsEventHandlers = [];

        var _onPointWon = function(/* match, point */) {
        };

        var _onGameWon = function(/* match, game */) {
            _gameCount++;
            if (_gameCount === 7) {
                _raiseNewBallsEvent();
            }
            else {
                if (_gameCount > 7) {
                    if (((_gameCount - 7) % 9) === 0) {
                        _raiseNewBallsEvent();
                    }
                }
            }
        };

        var _onSetWon = function(/* match, set */) {
        };

        var _onMatchWon = function(/* match */) {
        };

        var _reset = function() {
            _gameCount = 0;
        };

        var _raiseNewBallsEvent = function() {
            for (var i = 0; i < _newBallsEventHandlers.length; i++) {
                _newBallsEventHandlers[i]();
            }
        };

        var _addNewBallsEventHandler = function(handler) {
            _newBallsEventHandlers.push(handler);
        };

        return {
            onPointWon: _onPointWon,
            onGameWon: _onGameWon,
            onSetWon: _onSetWon,
            onMatchWon: _onMatchWon,
            reset: _reset,
            addNewBallsEventHandler: _addNewBallsEventHandler
        };
    };
}());
