var gulp = require("gulp");
var jshint = require("gulp-jshint");
var stylish = require('jshint-stylish');

var sources = {
    scripts: [
        "./scripts/**/*.js"
    ]
};

console.log(sources);

gulp.task("default", function() {
    gulp.src(sources.scripts)
        .pipe(jshint(".jshintrc"))
        .pipe(jshint.reporter("default"));
});
