"use strict";

import {gulp, paths} from '../gulpfile.babel.js';
import formatHtml from 'gulp-format-html';

export function html () {
  return gulp.src(paths.html.source)
    .pipe(formatHtml())
    .pipe(gulp.dest(paths.html.dest))
    .pipe(gulp.browsersync.stream());
}