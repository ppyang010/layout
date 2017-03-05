var gulp = require('gulp'),// 必须先引入gulp插件
	connect = require('gulp-connect'),//用于创建本地服务器
	browserify = require('gulp-browserify'),//js服务端代码在浏览器端可用
	concat = require('gulp-concat'),// 合并文件
	port = process.env.port || 5000;

//js代码转换
gulp.task('browserify',function(){
    gulp.src('./app/js/main.js')
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
    gulp.src('./app/*.html')
    .pipe(connect.reload());
});


// watch 监听文件变化
gulp.task('watch',function(){
	gulp.watch('./app/**/*.js',['browserify']);
    gulp.watch('./dist/**/*.js',['js']);
    gulp.watch('./app/*.html',['html']);
});
// 默认任务
gulp.task('default',['browserify','connect']);
gulp.task('b',['browserify']);
//开发环境
gulp.task('dev',['browserify','connect','watch'])
