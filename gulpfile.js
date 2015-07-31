var gulp = require('gulp');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');

gulp.task('default', ['buildDevel']);

gulp.task('buildDevel', function(){
    deployVendor();
    deployCustom();
});

gulp.task('deployVendor', deployVendor);
gulp.task('deployCustom', deployCustom);

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

    gulp.src('src/angular-bootstrap-select.js')
        .pipe(gulp.dest('demo'))
}

function deployCustom() {

}