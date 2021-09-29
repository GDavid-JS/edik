"use strict";

import {gulp, paths} from '../gulpfile.babel.js';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import plumber from 'gulp-plumber';
import mincss from 'gulp-clean-css';

const postcssConfig = require ('../postcss.config.js');

export function styles () {
  return gulp.src(paths.styles.source)
  .pipe(postcss(postcssConfig))
  .pipe(plumber())
  .pipe(sass())
  .pipe(gulp.gulpif(!gulp.development, gulp.rename(path => { 
    path.basename += `.min`;
    })))
  .pipe(gulp.gulpif(!gulp.development, mincss()))
  .pipe(gulp.dest(paths.styles.dest))
  .pipe(gulp.debug({
    title: `"Styles"`
  }))
  .pipe(gulp.browsersync.stream());;
}