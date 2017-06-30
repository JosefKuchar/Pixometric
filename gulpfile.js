const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

gulp.task("typescript", () => {
    return gulp.src("src/index.ts")
        .pipe(tsProject())
        .pipe(gulp.dest("bin"));
});

// Watch for changes
gulp.task("watch", () => {
    gulp.watch("src/**.ts", ["typescript"]);
});

// Run without parameters
gulp.task("default", ["typescript", "watch"]);