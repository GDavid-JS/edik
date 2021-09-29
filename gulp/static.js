"use strict";

import {gulp, paths} from '../gulpfile.babel.js';

export function stat () {
  return gulp.src(paths.static.source)
    .pipe(gulp.debug({
      title: `"Static"`
    }))
    .pipe(gulp.dest(paths.static.dest));
}