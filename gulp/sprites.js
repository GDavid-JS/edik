"use strict";

import {gulp, paths} from '../gulpfile.babel.js';
import svg from 'gulp-svg-sprite';

export function sprites () {
  return gulp.src(paths.sprites.source)
    .pipe(svg({
      shape: {
        dest: "intermediate-svg"
      },
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      }
    }))
    .pipe(gulp.dest(paths.sprites.dest))
    .pipe(gulp.debug({
      title: `"Sprites"`
    }));
};