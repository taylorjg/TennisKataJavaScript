/* global document */

(function () {

    "use strict";

    $(document).ready(function() {

        var _controller = window.tennisKata.factory.createController();

        _controller.addScoreChangedEventHandler(function(eventData) {

            $("#player1Name").html(eventData.player1Name);
            $("#player1Points").html(eventData.player1Points);
            $("#player1Games").html(eventData.player1Games);
            $("#player1Sets").html(eventData.player1Sets);

            $("#player2Name").html(eventData.player2Name);
            $("#player2Points").html(eventData.player2Points);
            $("#player2Games").html(eventData.player2Games);
            $("#player2Sets").html(eventData.player2Sets);
        });

        $("#setPlayerNamesBtn").click(function() {
            var player1Name = $("#player1NameTxt").val();
            var player2Name = $("#player2NameTxt").val();
            _controller.setPlayerNames(player1Name, player2Name);
        });

        $("#setMatchLengthBtn").click(function() {
            var matchLength = $("input[name='matchLengthRadioButtonGroup']:checked").val();
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
        });

        _controller.reset();
    });

} ());
