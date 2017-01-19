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
		src:['src/**/*.scss','!src/sys.scss','!src/sys-*.scss'],
		des:'dist/'
	},
	script:{
		src:['src/**/*.js','!src/sys.js','!lib/**/*.js'],
		des:'dist/'
	},
	image:{
		src:'src/assets/**/*.{svg,png,jpg,gif}',
		des:'dist/assets'
	},
	lib:{
		src:'src/lib/**/*',
		des:'dist/lib'
	},
	release:{
		src:'dist/**/*',
		des:'docs/ys'
	}
}
gulp.task('css:compile',function(){
	return gulp.src(paths.style.src)
			.pipe($.compass({
				config_file:'./config.rb',
				css: 'dist',
				sass:'src'
			})
			.on('error', function(error) {
		      console.log(error);
		      this.emit('end');
		    }))
			.pipe(gulp.dest(paths.style.des));
});
gulp.task('css:min',function(){
	return gulp.src(paths.min_css.src)
			.pipe($.sourcemaps.init())
			.pipe($.compass({
				config_file:'./config.rb',
				css: 'dist',
				sass:'src',
				style: 'expanded'
			}).on('error', function(error) {
		      console.log(error);
		      this.emit('end');
		    }))
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
	del(['dist','release','docs/ys']);
});
gulp.task('default',function(){
	$.runSequence('clean','css:compile','css:min',['image','script:parts','script:all','copy']);
});

// release doc
gulp.task('release',function(){
	return gulp.src(paths.release.src)
			.pipe(gulp.dest(paths.release.des));
});

gulp.task('cp',function(){
	console.log($);
});
function watch(){
	gulp.watch(paths.style.src,['css:compile','css:min']);
	gulp.watch(paths.image.src,['image']);
	gulp.watch(paths.script.src,['script:parts','script:all']);
}
gulp.task('watch',watch);

