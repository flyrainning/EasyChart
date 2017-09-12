'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

var del = require('del');
var fs = require('fs');
var path = require('path');

var dist="dist";



gulp.task('js', function(){
  return gulp.src('src/EasyChart/*.js')
      //  .pipe($.sourcemaps.init())
        .pipe($.concat('./js/EasyChart.js'))
        .pipe($.babel({
            presets: ['env']
        }))

    //    .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(dist))
        .pipe($.uglify())
        .pipe($.rename('./js/EasyChart.min.js'))
        .pipe(gulp.dest(dist));


});
gulp.task('css', function(){
  return gulp.src([
    'src/css/*.css',
    'src/css/*.scss'
  ])
        .pipe($.concat('./css/EasyChart.css'))
        .pipe($.sass())
        .pipe(gulp.dest(dist));

});
gulp.task('echarts', function(){
  return gulp.src('src/echarts/*.js')
        .pipe(gulp.dest(dist+"/js"));


});
gulp.task('image', function(){

});
gulp.task('build', function(cb){
  runSequence('clean',['js','css','image','echarts'],cb);
});
gulp.task('default', ['build'],function(){
  // 将你的默认的任务代码放在这
});
gulp.task('watch', function(){
    gulp.watch('src/*', ['build']);
});
gulp.task('clean',function (cb) {
  return del([
    dist+'/*'
  ]);
});
