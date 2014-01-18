(function () {

    "use strict";

    window.tennisKata = window.tennisKata || {};

    var LOVE_TEXT = "";
    var FIFTEEN_TEXT = "15";
    var THIRTY_TEXT = "30";
    var FORTY_TEXT = "40";
    var WON_TEXT = "W";
    var LOST_TEXT = "L";
    var ADVANTAGE_TEXT = "A";

    var _scoreTextDictionary = [
        LOVE_TEXT,
        FIFTEEN_TEXT,
        THIRTY_TEXT,
        FORTY_TEXT
    ];

    window.tennisKata.scoreboard = function(game) {

        var _game = game;
        var _scores = {};

        _scores[_game.getPlayer1().getId()] = LOVE_TEXT;
        _scores[_game.getPlayer2().getId()] = LOVE_TEXT;

        var _onWin = function(wp, lp) {
            _scores[wp.getId()] = WON_TEXT;
            _scores[lp.getId()] = LOST_TEXT;
        };

        var _onAdvantage = function(ap, op) {
            _scores[ap.getId()] = ADVANTAGE_TEXT;
            _scores[op.getId()] = FORTY_TEXT;
        };

        var _onDeuce = function() {
            _scores[_game.getPlayer1().getId()] = FORTY_TEXT;
            _scores[_game.getPlayer2().getId()] = FORTY_TEXT;
        };

        var _onOtherScore = function(s1, s2) {
            _scores[_game.getPlayer1().getId()] = _scoreTextDictionary[s1];
            _scores[_game.getPlayer2().getId()] = _scoreTextDictionary[s2];
        };

        var _getScores = function() {
            var scoreText1 = _scores[_game.getPlayer1().getId()];
            var scoreText2 = _scores[_game.getPlayer2().getId()];
            return [scoreText1, scoreText2];
        };

        _game.setWinCallback(_onWin);
        _game.setAdvantageCallback(_onAdvantage);
        _game.setDeuceCallback(_onDeuce);
        _game.setOtherScoreCallback(_onOtherScore);

        return {
            getScores:_getScores
        };
    };
} ());
