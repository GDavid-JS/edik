"use strict";

import {gulp, paths} from '../gulpfile.babel.js';

export function scripts () {
  return gulp.src(paths.scripts.source)
  .pipe(gulp.webpackStream(gulp.webpackConfig), gulp.webpack)
  .pipe(gulp.gulpif(!gulp.development, gulp.rename(function (path) { 
    path.basename += `.min`; 
    path.extname = `.js`; 
    })))
  .pipe(gulp.dest(paths.scripts.dest))
  .pipe(gulp.debug({
    title: `"Scripts"`
  }))
  .pipe(gulp.browsersync.stream());
}