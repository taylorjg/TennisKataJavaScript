## TennisKata

The description of the tennis kata is very open ended in terms of what shape a solution should take.
I approached this kata with an idea for an HTML UI in mind.

After getting the JavaScript solution working, I then added the UI. Then, I went back and applied
further refactorings to the original code in an attempt to follow the "tell don't ask" principle - especially
with regard to the interaction between the game and the scoreboard. The scoreboard
establishes callbacks and uses these to maintain the score.

## Links

* http://codingdojo.org/cgi-bin/wiki.pl?KataTennis
* http://martinfowler.com/bliki/TellDontAsk.html
* http://media.pragprog.com/articles/jan_03_enbug.pdf
* http://pragprog.com/articles/tell-dont-ask

## Screenshots

The following screenshot shows my tennis kata HTML UI in action:

![Screenshot of the tennis kata UI](https://raw.github.com/taylorjg/TennisKataJavaScript/master/Images/WebPageScreenshot.png)

The following screenshot shows some of my unit tests running in WebStorm. I make use of my
[it_multiple.js](https://github.com/taylorjg/TennisKataJavaScript/blob/master/Tests/it_multiple.js)
Jasmine extension which provides a nice way to write parameterised tests (like using [TestCase] in NUnit):

![Screenshot of tennis kata unit tests](https://raw.github.com/taylorjg/TennisKataJavaScript/master/Images/WebStormKarmaScreenshot.png)

## Update

I have done a lot more work on this to implement the following additional features:

* Number of games won by each player
* Number of sets won by each player
* Number of games won by each player in previous sets
* Match length of 1, 3 or 5 sets
* Flag to indicate the current server
* Flag to indicate break points
* Flag to indicate set points
* Flag to indicate match points
* Flag to indicate new balls
* Score summary (short form of the current score)

Here is an updated screenshot of the HTML UI:

![Updated screenshot of the tennis kata UI](https://raw.github.com/taylorjg/TennisKataJavaScript/master/Images/WebPageScreenshot2.png)
