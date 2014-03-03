/**
 * Created by jonathantaylor on 28/02/2014.
 */

/* global jasmine, document */

(function(){

    "use strict";

    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = "http://localhost:63342/TennisKataJavaScript";
        loadTennisKataMarkup();
    });

    describe("User interface tests", function() {

        it("has the correct initial state", function() {
            window.tennisKata.presentationLayer();
            expect($("#player1ScoresPointBtn")).not.toBeDisabled();
            expect($("#player2ScoresPointBtn")).not.toBeDisabled();
            expectInnerHTMLToBe("#player1PreviousSets1", "");
            expectInnerHTMLToBe("#player2PreviousSets1", "");
            expectInnerHTMLToBe("#player1PreviousSets2", "");
            expectInnerHTMLToBe("#player2PreviousSets2", "");
            expectInnerHTMLToBe("#player1PreviousSets3", "");
            expectInnerHTMLToBe("#player2PreviousSets3", "");
            expectInnerHTMLToBe("#player1PreviousSets4", "");
            expectInnerHTMLToBe("#player2PreviousSets4", "");
            expectInnerHTMLToBe("#player1Sets", "");
            expectInnerHTMLToBe("#player1Games", "");
            expectInnerHTMLToBe("#player1Points", "");
            expectInnerHTMLToBe("#player2Sets", "");
            expectInnerHTMLToBe("#player2Games", "");
            expectInnerHTMLToBe("#player2Points", "");
            expect($("#player1Serving")).toHaveCss({display:"inline"});
            expect($("#player1NewBalls")).toBeHidden();
            expect($("#player1SignificantPoint")).toBeHidden();
            expect($("#player2Serving")).toBeHidden();
            expect($("#player2NewBalls")).toBeHidden();
            expect($("#player2SignificantPoint")).toBeHidden();
        });

        it("shows the correct score when a point has been scored by player1", function() {
            window.tennisKata.presentationLayer();
            $("#player1ScoresPointBtn").trigger("click");
            expectInnerHTMLToBe("#player1Sets", "");
            expectInnerHTMLToBe("#player1Games", "");
            expectInnerHTMLToBe("#player1Points", "15");
            expectInnerHTMLToBe("#player2Sets", "");
            expectInnerHTMLToBe("#player2Games", "");
            expectInnerHTMLToBe("#player2Points", "&nbsp;0");
        });

        it("shows the correct score when two points have been scored by each player", function() {
            window.tennisKata.presentationLayer();
            $("#player1ScoresPointBtn").trigger("click");
            $("#player1ScoresPointBtn").trigger("click");
            $("#player2ScoresPointBtn").trigger("click");
            $("#player2ScoresPointBtn").trigger("click");
            expectInnerHTMLToBe("#player1Sets", "");
            expectInnerHTMLToBe("#player1Games", "");
            expectInnerHTMLToBe("#player1Points", "30");
            expectInnerHTMLToBe("#player2Sets", "");
            expectInnerHTMLToBe("#player2Games", "");
            expectInnerHTMLToBe("#player2Points", "30");
        });
    });

    var loadTennisKataMarkup = function() {
        var fixture = jasmine.getFixtures().read("TennisKata.html");
        var parsedFixture = $.parseHTML(fixture, document, false);
        var div = $("<div />");
        div.append(parsedFixture);
        jasmine.getFixtures().set(div);
    };

    var expectInnerHTMLToBe = function(selector, expectedText) {
        var $elem = $(selector);
        expect($elem.length).toBe(1);
        expect($elem.html()).toBe(expectedText);
    };
}());
