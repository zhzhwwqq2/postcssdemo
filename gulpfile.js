/*
* @Author: Administrator
* @Date:   2017-09-06 21:25:43
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-10 20:04:25
*/
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');//前缀自动补全
var sourcemaps = require('gulp-sourcemaps');//source map功能
var rename = require('gulp-rename');
var cssnano = require('cssnano');//压缩样式
var stylelint = require('stylelint');//代码检查
var cssvariables = require('postcss-css-variables');//变量
var cssmixins = require('postcss-mixins');
var calc = require('postcss-calc');
var foreach = require('postcss-each');//each循环

gulp.task('styles',function(){
    gulp.src('src/*.css')
    .pipe(postcss([autoprefixer,cssvariables(/*options*/),cssmixins(/*options*/),calc(/*options*/),foreach(/*options*/)]))
    .pipe(rename('example.min.css'))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest('dest/'));

})

gulp.task('rename',['styles'],function(){
    return gulp.src('dest/example.css')
           .pipe(postcss([cssnano]))
           .pipe(rename('example.min.css'))
           .pipe(gulp.dest("dest/"));
})

//https://github.com/stylelint/stylelint/blob/master/docs/user-guide/example-config.md 配置实例
gulp.task("lint-styles",function(){
    return gulp.src("src/*.css")
           .pipe(postcss([stylelint({
               "rules":{
               	   "color-no-invalid-hex":true,
               	   "declaration-colon-space-before":"never",
               	   "indentation":2,
               	   "number-leading-zero":"always"
               }
           })]))
})

gulp.task('default',['lint-styles','styles','rename'])

var watcher = gulp.watch('src/*.css',['default']);//自动化编译
watcher.on('change',function(event) {
	console.log('File '+event.path + ' was '+event.type + ', running tasks...');
})