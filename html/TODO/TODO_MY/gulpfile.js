var gulp = require('gulp'),// 必须先引入gulp插件
	connect = require('gulp-connect'),//用于创建本地服务器
	browserify = require('gulp-browserify'),//js服务端代码在浏览器端可用
	concat = require('gulp-concat'),// 合并文件
	port = process.env.port || 5000;
var webpack=require('gulp-webpack');
var webpackConfig=require('./webpack.config.js');

//js代码转换
gulp.task('browserify',function(){
    gulp.src('./src/js/main.js')
    .pipe(browserify({
        transform:'reactify'
    }))
    .pipe(gulp.dest('./dist/js'));//写文件
});

//开启一个服务器 并实时刷新
//live reload
gulp.task('connect',function(){
    connect.server({
        root:'./',
        port:port,
        livereload:true
    })
});

//reload
gulp.task('js',function(){
    gulp.src('./dist/js/*.js')
    .pipe(connect.reload());
});
gulp.task('html',function(){
    gulp.src('./src/*.html')
    .pipe(connect.reload());
});


// watch 监听文件变化
gulp.task('watch',function(){
	gulp.watch('./src/**/*.js',['browserify']);
    gulp.watch('./dist/**/*.js',['js']);
    gulp.watch('./*.html',['html']);
});

//配合webpack使用
gulp.task('webpack', function () {
    var myConfig = Object.create(webpackConfig);
    return gulp
        .src('./src/main.js')
        .pipe(webpack(myConfig))
        .pipe(gulp.dest('./dist/js'));
});


// 默认任务
gulp.task('default',['browserify','connect']);
gulp.task('b',['browserify']);
//开发环境
gulp.task('dev',['browserify','connect','watch'])
