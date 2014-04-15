var gulp = require("gulp");
var jshint = require("gulp-jshint");

var sources = {
    scripts: [
        "./scripts/**/*.js"
    ]
};

gulp.task("default", function() {
    gulp.src(sources.scripts)
        .pipe(jshint(".jshintrc"))
        .pipe(jshint.reporter("default"));
});
