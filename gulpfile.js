'use strict';

const gulp = require('gulp');
const del = require('del');
const $ = require('gulp-load-plugins')();

const paths = {
	min_css:{
		src:'src/sys.scss',
		des:'dist/'
	},
	all_script:{
		src:'src/sys.js',
		des:'dist/'
	},
	style:{
		src:['src/**/*.scss','!src/sys.scss'],
		des:'dist/'
	},
	script:{
		src:['src/**/*.js','!src/sys.js'],
		des:'dist/'
	},
	image:{
		src:'src/assets/**/*.{svg,png,jpg,gif}',
		des:'dist/assets'
	},
	lib:{
		src:'src/lib/*',
		des:'dist'
	}
}
gulp.task('css:compile',function(){
	return gulp.src(paths.style.src)
			.pipe($.sass().on('error',$.sass.logError))
			.pipe(gulp.dest(paths.style.des));
});
gulp.task('css:min',function(){
	return gulp.src(paths.min_css.src)
			.pipe($.sourcemaps.init())
			.pipe($.sass().on('error',$.sass.logError))
			.pipe(gulp.dest(paths.min_css.des))
			.pipe($.csso())
			.pipe($.concat('sys.min.css'))
			.pipe($.sourcemaps.write('.'))
			.pipe(gulp.dest(paths.min_css.des));
});
gulp.task('image',function(){
	return gulp.src(paths.image.src)
			.pipe($.imagemin({
				progressive: true,
     			interlaced: true
			}))
			.pipe(gulp.dest(paths.image.des));
});
gulp.task('script:parts',function(){
	return gulp.src(paths.script.src)
			.pipe(gulp.dest(paths.script.des));
});
gulp.task('script:all',function(){
	return gulp.src(paths.script.src)
			.pipe($.sourcemaps.init())
			.pipe($.concat('sys.js'))
			.pipe(gulp.dest(paths.script.des))
			.pipe($.uglify({
				sourceMapIncludeSources:true
			}))
			.pipe($.concat('sys.min.js'))
			.pipe($.sourcemaps.write('.'))
			.pipe(gulp.dest(paths.script.des));
});
gulp.task('copy',function(){
	return gulp.src(paths.lib.src)
			.pipe(gulp.dest(paths.lib.des));
});
gulp.task('clean',function(){
	del(['dist','release']);
})
gulp.task('default',function(){
	$.runSequence('clean','css:compile','css:min',['image','script:parts','scripts:all','copy']);
});
function watch(){
	gulp.watch(paths.style.src,['css:compile','css:min']);
	gulp.watch(paths.image.src,['image']);
	gulp.watch(paths.script.src,['script:parts','script:all']);
}
gulp.task('watch',watch);

