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

        var _saveScores = function(ps1, ps2) {
            _scores = {};
            _scores[ps1[0].getId()] = ps1[1];
            _scores[ps2[0].getId()] = ps2[1];
        };

        _saveScores([_game.getPlayer1(), LOVE_TEXT], [_game.getPlayer2(), LOVE_TEXT]);

        var _onWin = function(wp, lp) {
            _saveScores([wp, WON_TEXT], [lp, LOST_TEXT]);
        };

        var _onAdvantage = function(ap, op) {
            _saveScores([ap, ADVANTAGE_TEXT], [op, FORTY_TEXT]);
        };

        var _onDeuce = function() {
            _saveScores([_game.getPlayer1(), FORTY_TEXT], [_game.getPlayer2(), FORTY_TEXT]);
        };

        var _onOtherScore = function(s1, s2) {
            var scoreText1 = _scoreTextDictionary[s1];
            var scoreText2 = _scoreTextDictionary[s2];
            _saveScores([_game.getPlayer1(), scoreText1], [_game.getPlayer2(), scoreText2]);
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
