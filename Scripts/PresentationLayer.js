/* global document */

(function () {

    "use strict";

    $(document).ready(function() {

        var _controller = window.tennisKata.controller();
        var _scoreSummaryFormatter = window.tennisKata.presentation.scoreSummaryFormatter();
        var _setsGamesPointsFormatter = window.tennisKata.presentation.setsGamesPointsFormatter();
        var _previousSetsFormatter = window.tennisKata.presentation.previousSetsFormatter();
        var _currentServer = null;

        var _updatePlayerNames = function() {
            $("#player1Name").html(_controller.getPlayer1().getName());
            $("#player2Name").html(_controller.getPlayer2().getName());
        };

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
            var viewModel = _previousSetsFormatter.formatPreviousSets(match);
            $("#player1PreviousSets1").html(viewModel.player1Set1Games);
            $("#player2PreviousSets1").html(viewModel.player2Set1Games);
            $("#player1PreviousSets2").html(viewModel.player1Set2Games);
            $("#player2PreviousSets2").html(viewModel.player2Set2Games);
            $("#player1PreviousSets3").html(viewModel.player1Set3Games);
            $("#player2PreviousSets3").html(viewModel.player2Set3Games);
            $("#player1PreviousSets4").html(viewModel.player1Set4Games);
            $("#player2PreviousSets4").html(viewModel.player2Set4Games);
        };

        var _updateScoreSummary = function(match) {
            var player1First = (_currentServer === _controller.getPlayer1());
            _updateScoreSummaryText(match, player1First);
        };

        var _updateDisplay = function(match) {
            _updateSetsGamesPoints(match);
            _updatePreviousSets(match);
            _updateScoreSummary(match);
        };

        var _updateScoreSummaryText = function(match, player1First) {
            var winner = match.getMatchWinner();
            var gameOver = !!winner;
            if (gameOver) {
                player1First = (winner === match.getPlayer1());
            }
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
            _clearFlags();
            _controller.player1WinsPoint();
        });

        $("#player2ScoresPointBtn").click(function() {
            _clearFlags();
            _controller.player2WinsPoint();
        });

        var _clearFlags = function() {
            $(".flags *").hide();
        };

        $("#resetBtn").click(function() {
            _controller.reset();
        });

        var _updateMatchLengthRadioButtons = function() {
            var matchLength = _controller.getMatchLength();
            $("input[name='matchLengthRadioButtonGroup'][value='" + matchLength + "']").prop("checked", true);
        };

        _controller.addResetEventHandler(function(match) {
            $("#player1ScoresPointBtn").prop("disabled", false);
            $("#player2ScoresPointBtn").prop("disabled", false);
            _updatePlayerNames();
            _updateDisplay(match);
            _updateMatchLengthRadioButtons();
            _clearFlags();
        });

        _controller.addScoreChangedEventHandler(_updateDisplay);

        _controller.addMatchWonEventHandler(function(match) {
            $("#player1ScoresPointBtn").prop("disabled", true);
            $("#player2ScoresPointBtn").prop("disabled", true);
            var winner = match.getMatchWinner();
            var player1First = (winner === _controller.getPlayer1());
            _updateScoreSummaryText(match, player1First);
        });

        var _currentServerMonitor = window.tennisKata.monitors.currentServerMonitor(true /* player1First */);
        _currentServerMonitor.addServerChangedEventHandler(function(currentServer) {
            var currentServerName = (currentServer) ? currentServer.getName() : "null";
            console.log("inside serverChanged event handler - currentServer: " + currentServerName);
            _updateCurrentServer(currentServer);
        });
        _controller.addMonitor(_currentServerMonitor);

        var _newBallsMonitor = window.tennisKata.monitors.newBallsMonitor();
        _newBallsMonitor.addNewBallsEventHandler(function() {
            console.log("inside newBalls event handler - currentServer:" + _currentServer.getName());
            if (_currentServer === _controller.getPlayer1()) {
                $("#player1NewBalls").show();
            }
            else {
                $("#player2NewBalls").show();
            }
        });
        _controller.addMonitor(_newBallsMonitor);

        var _showSignificantPoint = function(player, numSignificantPoints, pointType) {
            var flagSelector = (player === _controller.getPlayer1()) ? "#player1SignificantPoint" : "#player2SignificantPoint";
            var significantPointText;
            if (numSignificantPoints === 1) {
                significantPointText = [pointType, "point"].join(" ");
            }
            else {
                significantPointText = [numSignificantPoints.toString(), pointType, "points"].join(" ");
            }
            $(flagSelector)
                .html(significantPointText)
                .show();
        };

        var _significantPointMonitor = window.tennisKata.monitors.significantPointMonitor();
        _significantPointMonitor.addBreakPointEventHandler(function(breakPoints, player) {
            console.log("inside breakPoint event handler - breakPoints: " + breakPoints + "; player: " + player.getName());
            _showSignificantPoint(player, breakPoints, "break");
        });
        _significantPointMonitor.addSetPointEventHandler(function(setPoints, player) {
            console.log("inside setPoint event handler - setPoints: " + setPoints + "; player: " + player.getName());
            _showSignificantPoint(player, setPoints, "set");
        });
        _significantPointMonitor.addMatchPointEventHandler(function(matchPoints, player) {
            console.log("inside matchPoint event handler - matchPoints: " + matchPoints + "; player: " + player.getName());
            _showSignificantPoint(player, matchPoints, "match");
        });
        _controller.addMonitor(_significantPointMonitor);

        _controller.init();
    });
} ());
