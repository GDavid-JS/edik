"use strict";

import {gulp, paths} from '../gulpfile.babel.js';

export function fonts () {
  return gulp.src(paths.fonts.source)
    .pipe(gulp.dest(paths.fonts.dest))
    .pipe(gulp.debug({
      title: `"Fonts"`
    }));
};