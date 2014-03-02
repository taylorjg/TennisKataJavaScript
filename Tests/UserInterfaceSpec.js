/**
 * Created by jonathantaylor on 28/02/2014.
 */

/* global jasmine, document */

(function(){

    "use strict";

//    var _player1;
//    var _player2;
//    var _controller;

    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = "http://localhost:63342/TennisKataJavaScript";
    });

    describe("User interface tests", function() {
        describe("Sets, games, points", function() {
            it("Simple first test", function() {
                loadTennisKataMarkup();
            });
        });
    });

    var loadTennisKataMarkup = function() {
        var fixture = jasmine.getFixtures().read("TennisKata.html");
        var parsedFixture = $.parseHTML(fixture, document, false);
        var div = $("<div />");
        div.append(parsedFixture);
        jasmine.getFixtures().set(div);
    };
}());
