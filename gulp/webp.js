"use strict";

import {gulp, paths} from '../gulpfile.babel.js';
import imageminWebp from 'imagemin-webp';
import gulpWebp from 'gulp-webp';

export function webp () {
  return gulp.src(paths.webp.source)
    .pipe(gulpWebp(gulp.gulpif(!gulp.development, imageminWebp({
      lossless: true,
      quality: 100,
      alphaQuality: 100
    }))))
    .pipe(gulp.dest(paths.webp.dest))
    .pipe(gulp.debug({
      title: `"Images"`
    }));
}