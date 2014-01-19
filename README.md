
## TennisKata

The description of the tennis kata is very open ended in terms of what shape a solution should take.
I approached this kata with an idea for an HTML UI in mind.

After getting the JavaScript solution working, I then added the UI. Then, I went back and applied
further refactorings to the original code in an attempt to follow the "tell don't ask" principle
- especially with regard to the interaction between the game and the scoreboard. The scoreboard
establishes callbacks and uses these to maintain the score.

## Links

* http://codingdojo.org/cgi-bin/wiki.pl?KataTennis

## Screenshots

The following screenshot shows my tennis kata HTML UI in action:

![Screenshot of tennis kata UI](https://raw.github.com/taylorjg/TennisKataJavaScript/master/Images/WebPageScreenshot.png)

The following screenshot shows some of my unit tests running in WebStorm. I make use of my
[it_multiple.js](https://github.com/taylorjg/TennisKataJavaScript/blob/master/Tests/it_multiple.js)
Jasmine extension which provides a nice way to write parameterised tests:

![Screenshot of tennis kata unit tests](https://raw.github.com/taylorjg/TennisKataJavaScript/master/Images/WebStormKarmaScreenshot.png)
