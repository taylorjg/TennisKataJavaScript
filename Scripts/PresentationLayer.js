/* global document */

(function () {

    "use strict";

    $(document).ready(function() {

        var _controller = window.tennisKata.factory.createController();
        var _scoreSummaryFormatter = window.tennisKata.presentation.scoreSummaryFormatter();
        var _gamePointsFormatter = window.tennisKata.presentation.gamePointsFormatter();
        var _currentServer = null;

        var _rightJustifyScoreText = function(scoreText, minWidth) {
            var padding = "";
            for (var i = scoreText.length; i < minWidth; i++) {
                padding += "&nbsp;";
            }
            return padding + scoreText;
        };

        _controller.addResetEventHandler(function() {

            $(".previousSets").empty();

            $("#player1Name").html(_controller.getPlayer1().getName());
            $("#player1Sets").html("");
            $("#player1Games").html("");
            $("#player1Points").html("");

            $("#player2Name").html(_controller.getPlayer2().getName());
            $("#player2Sets").html("");
            $("#player2Games").html("");
            $("#player2Points").html("");

            $("#player1ScoresPointBtn").prop("disabled", false);
            $("#player2ScoresPointBtn").prop("disabled", false);
        });

        var _updateCurrentSet = function(match) {

            var player1SetsText = "";
            var player2SetsText = "";
            var player1Sets = match.getPlayer1Sets();
            var player2Sets = match.getPlayer2Sets();
            if (player1Sets || player2Sets) {
                player1SetsText = _rightJustifyScoreText(player1Sets.toString(), 2);
                player2SetsText = _rightJustifyScoreText(player2Sets.toString(), 2);
            }
            $("#player1Sets").html(player1SetsText);
            $("#player2Sets").html(player2SetsText);

            var currentSet = null;
            var currentGame = null;

            match.iterateSets(function(set) {
                currentSet = set;
            });

            if (currentSet) {
                currentSet.iterateGames(function(game) {
                    currentGame = game;
                });
            }

            var player1GamesText = "";
            var player2GamesText = "";
            if (currentSet && !currentSet.getSetWinner()) {
                var player1Games = currentSet.getPlayer1Games();
                var player2Games = currentSet.getPlayer2Games();
                if (player1Games || player2Games) {
                    player1GamesText = _rightJustifyScoreText(player1Games.toString(), 2);
                    player2GamesText = _rightJustifyScoreText(player2Games.toString(), 2);
                }
            }
            $("#player1Games").html(player1GamesText);
            $("#player2Games").html(player2GamesText);

            var player1PointsText = "";
            var player2PointsText = "";
            if (currentGame && !currentGame.getGameWinner()) {
                var separateGamePointsText = _gamePointsFormatter.formatGamePointsSeparately(currentGame);
                player1PointsText = separateGamePointsText[0];
                player2PointsText = separateGamePointsText[1];
            }
            $("#player1Points").html(player1PointsText);
            $("#player2Points").html(player2PointsText);
        };

        var _updatePreviousSets = function(match) {
            var setNumber = 1;
            match.iterateSets(function(set) {
                if (!!set.getSetWinner() && !set.isFinalSet()) {
                    $("#player1PreviousSets" + setNumber).html(set.getPlayer1Games());
                    $("#player2PreviousSets" + setNumber).html(set.getPlayer2Games());
                    setNumber++;
                }
            });
        };

        var _updateScoreSummary = function(match) {
            _updateScoreSummaryText(match, true, false);
        };

        _controller.addScoreChangedEventHandler(function(eventData, match) {
            _updateCurrentSet(match);
            _updatePreviousSets(match);
            _updateScoreSummary(match);
        });

        var _updateScoreSummaryText = function(match, player1First, gameOver) {
            var scoreSummaryText = _scoreSummaryFormatter.formatScoreSummary(match, player1First);
            if (scoreSummaryText) {
                if (gameOver) {
                    $("#scoreSummaryWhoFirst").html("&nbsp;(winner first)");
                }
                else {
                    $("#scoreSummaryWhoFirst").html("&nbsp;(server first)");
                }
                $("#scoreSummaryValue").html(scoreSummaryText);
            }
            $("#scoreSummary").toggle(!!scoreSummaryText);
        };

        var _updateCurrentServer = function(currentServer) {
            _currentServer = currentServer;
            $("#player1Serving").toggle(_currentServer === _controller.getPlayer1());
            $("#player2Serving").toggle(_currentServer === _controller.getPlayer2());
        };

        _controller.addServerChangedEventHandler(_updateCurrentServer);

        $("#setPlayerNamesBtn").click(function() {
            var player1Name = $("#player1NameTxt").val();
            var player2Name = $("#player2NameTxt").val();
            _controller.setPlayerNames(player1Name, player2Name);
        });

        $("#setMatchLengthBtn").click(function() {
            var matchLengthString = $("input[name='matchLengthRadioButtonGroup']:checked").val();
            var matchLength = parseInt(matchLengthString, 10);
            _controller.setMatchLength(matchLength);
        });

        $("#player1ScoresPointBtn").click(function() {
            _controller.player1WinsPoint();
        });

        $("#player2ScoresPointBtn").click(function() {
            _controller.player2WinsPoint();
        });

        $("#resetBtn").click(function() {
            _controller.reset();
            _updateCurrentServer(_controller.getServer());
        });

        _controller.reset();

        var _updateMatchLengthRadioButtons = function() {
            var matchLength = _controller.getMatchLength();
            $("input[name='matchLengthRadioButtonGroup'][value='" + matchLength + "']").prop("checked", true);
        };

        _updateMatchLengthRadioButtons();
        _updateCurrentServer(_controller.getServer());
    });
} ());
