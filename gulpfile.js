const gulp = require("gulp");
const babel = require("gulp-babel");

gulp.task("babel", () => {
    return gulp.src("src/index.js")
        .pipe(babel())
        .pipe(gulp.dest("bin"));
});

// Watch for changes
gulp.task("watch", () => {
    gulp.watch("src/**.js", ["babel"]);
});

// Run without parameters
gulp.task("default", ["babel", "watch"]);