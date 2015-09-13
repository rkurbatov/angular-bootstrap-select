var gulp = require('gulp');
var bump = require('gulp-bump');
var git = require('gulp-git');
var excludeGitignore = require('gulp-exclude-gitignore');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var angularTemplates = require('gulp-angular-templates');
var sq = require('streamqueue');


gulp.task('default', ['buildDevel']);

gulp.task('buildDevel', function () {
    deployVendor();
});

gulp.task('bumpMajor', bumpVersion('major'));
gulp.task('bumpMinor', bumpVersion('minor'));
gulp.task('bumpPatch', bumpVersion('patch'));

gulp.task('deployVendor', deployVendor);

function deployVendor(production) {
    var vendorLibs = [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/bootstrap-select/dist/js/bootstrap-select.js',
        'bower_components/angular/angular.js'
    ];

    var vendorStyles = [
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/bootstrap-select/dist/css/bootstrap-select.css'
    ];

    gulp.src(vendorLibs)
        .pipe(concat('vendor.min.js'))
        .pipe(gulpif(production, uglify()))
        .pipe(gulp.dest('demo'));

    gulp.src(vendorStyles)
        .pipe(concat('vendor.min.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('demo'));

    var sources = gulp.src('src/**/*.js');

    var templates = gulp.src('templates/**/*.html')
        .pipe(angularTemplates({
            module: 'angular-bootstrap-select',
            standalone: false
        }));

    sq({objectMode: true}, sources, templates)
        .pipe(concat('angular-bootstrap-select-tpls.js'))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('dist'));

}

function bumpVersion(bumpType) {
    return function () {
        gulp.src(['./package.json', './bower.json'])
            .pipe(bump({type: bumpType}))
            .pipe(gulp.dest('./'))
            .pipe(git.commit("Bump package version"));
    }
}
