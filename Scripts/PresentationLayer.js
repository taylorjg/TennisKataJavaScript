/* global document */

(function () {

    "use strict";

    $(document).ready(function() {

        var _controller = window.tennisKata.factory.createController();
        var _scoreSummaryFormatter = window.tennisKata.presentation.scoreSummaryFormatter();
        var _setsGamesPointsFormatter = window.tennisKata.presentation.setsGamesPointsFormatter();
        var _currentServer = null;

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

        var _updateSetsGamesPoints = function(match) {
            var viewModel = _setsGamesPointsFormatter.formatSetsGamesPoints(match);
            $("#player1Sets").html(viewModel.player1SetsText);
            $("#player2Sets").html(viewModel.player2SetsText);
            $("#player1Games").html(viewModel.player1GamesText);
            $("#player2Games").html(viewModel.player2GamesText);
            $("#player1Points").html(viewModel.player1PointsText);
            $("#player2Points").html(viewModel.player2PointsText);
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
            _updateSetsGamesPoints(match);
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

        _controller.addMatchWonEventHandler(function(winner) {
            $("#player1ScoresPointBtn").prop("disabled", true);
            $("#player2ScoresPointBtn").prop("disabled", true);
            //var player1First = (winner === _controller.getPlayer1());
            //_updateScoreSummaryText(_lastSetData, player1First, true);
        });

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
