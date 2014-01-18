(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    window.tennisKata.controller = function() {

        var _player1 = window.tennisKata.factory.createPlayer("Player1");
        var _player2 = window.tennisKata.factory.createPlayer("Player2");
        var _game = window.tennisKata.factory.createGame(_player1, _player2);
        var _scoreboard = window.tennisKata.factory.createScoreboard(_game);

        // Should we have an array of these ?
        var _scoreChangedCallback = null;

        var _reportScore = function() {
            if (_scoreChangedCallback !== null) {
                var scores = _scoreboard.getScores();
                _scoreChangedCallback({
                    player1Name: _game.getPlayer1().getName(),
                    player1Score: scores[0],
                    player2Name: _game.getPlayer2().getName(),
                    player2Score: scores[1]
                });
            }
        };

        var _setPlayerNames = function(playerName1, playerName2) {
            var newPlayer1 = window.tennisKata.factory.createPlayer(playerName1);
            var newPlayer2 = window.tennisKata.factory.createPlayer(playerName2);
            _game.changePlayers(newPlayer1, newPlayer2);
        };

        var _setScoreChangedCallback = function(cb) {
            _scoreChangedCallback = cb;
        };

        var _pointScoredByPlayer1 = function() {
            _game.pointScoredByPlayer1();
            _reportScore();
        };

        var _pointScoredByPlayer2 = function() {
            _game.pointScoredByPlayer2();
            _reportScore();
        };

        var _reset = function() {
            _game.reset();
            _reportScore();
        };

        return {
            setPlayerNames: _setPlayerNames,
            setScoreChangedCallback: _setScoreChangedCallback,
            pointScoredByPlayer1: _pointScoredByPlayer1,
            pointScoredByPlayer2: _pointScoredByPlayer2,
            reset: _reset
        };
    };
} ());
