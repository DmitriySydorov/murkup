'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	prefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	cssmin = require('gulp-minify-css');

var path = {
	build: { //Тут мы укажем куда складывать готовые после сборки файлы
		html: 'build/',
		js: 'build/js/',
		css: 'build/css/',
		img: 'build/img/',
		fonts: 'build/fonts/'
	},
	src: { //Пути откуда брать исходники
		html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
		js: 'src/js/main.js',//В стилях и скриптах нам понадобятся только main файлы
		style: 'src/style/main.scss',
		styleFontello:'src/style/fontello.css',
		img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
		fonts: 'src/fonts/**/*.*'
	},
	watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		style: 'src/style/**/*.scss',
		styleFontello:'src/style/**/*.css',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	clean: './build'
};

gulp.task('styleFontello:build', function () {
	gulp.src(path.src.styleFontello) //Выберем файлы по нужному пути
		.pipe(sourcemaps.init()) //То же самое что и с js
		.pipe(sass()) //Скомпилируем
		.pipe(prefixer()) //Добавим вендорные префиксы
		.pipe(cssmin()) //Сожмем
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.css)); //И в build
});

gulp.task('js:build', function () {
	gulp.src(path.src.js) //Найдем наш main файл
		.pipe(sourcemaps.init()) //Инициализируем sourcemap
		.pipe(sourcemaps.write()) //Пропишем карты
		.pipe(uglify()) //Сожмем наш js
		.pipe(gulp.dest(path.build.js)); //Выплюнем готовый файл в build
});

gulp.task('style:build', function () {
	gulp.src(path.src.style) //Выберем наш main.scss
		.pipe(sourcemaps.init()) //Инициализируем sourcemap
		.pipe(sass()) //Скомпилируем
		.pipe(prefixer()) //Добавим вендорные префиксы
		.pipe(cssmin()) //Сожмем
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.css)); //И в build
});

gulp.task('fonts:build', function() {
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
});

gulp.task('image:build', function () {
	gulp.src(path.src.img) //Выберем наши картинки
		.pipe(gulp.dest(path.build.img)); //И бросим в build
});

gulp.task('build', [
	'js:build',
	'style:build',
	'fonts:build',
	'image:build',
	'styleFontello:build'
]);

gulp.task('watch', function(){
	watch([path.watch.style], function(event, cb) {
		gulp.start('style:build');
	});
	watch([path.watch.style], function(event, cb) {
		gulp.start('styleFontello:build');
	});
	watch([path.watch.js], function(event, cb) {
		gulp.start('js:build');
	});
	watch([path.watch.img], function(event, cb) {
		gulp.start('image:build');
	});
	watch([path.watch.fonts], function(event, cb) {
		gulp.start('fonts:build');
	});
});

gulp.task('default', ['build', 'watch']);