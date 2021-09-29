"use strict";

import {gulp, paths} from '../gulpfile.babel.js';
import gulpFavicons from 'gulp-favicons';

export function favicons () {
  return gulp.src(paths.favicon.source)
    .pipe(gulpFavicons({
      icons: {
        appleIcon: true,
        favicons: true,
        online: false,
        appleStartup: false,
        android: false,
        firefox: false,
        yandex: false,
        windows: false,
        coast: false
      }
    }))
    .pipe(gulp.dest(paths.favicon.dest))
    .pipe(gulp.debug({
      title: `"Favicon"`
    }));
};