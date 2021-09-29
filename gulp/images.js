"use strict";

import { gulp, paths } from '../gulpfile.babel.js';
import imagemin  from 'gulp-imagemin';
import imageminPngquant  from 'imagemin-pngquant';
import imageminZopfli  from 'imagemin-zopfli';
import imageminMozjpeg  from 'imagemin-mozjpeg';
import imageminGiflossy  from 'imagemin-giflossy';

export function images () {
  return gulp.src(paths.images.source)
    .pipe(gulp.gulpif(!gulp.development, imagemin([
      imageminGiflossy({
        optimizationLevel: 3,
        optimize: 3,
        lossy: 2
      }),
      imageminPngquant({
        speed: 5,
        quality: [0.6, 0.8]
      }),
      imageminZopfli({
        more: true
      }),
      imageminMozjpeg({
        progressive: true,
        quality: 90
      }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { removeUnusedNS: false },
          { removeUselessStrokeAndFill: false },
          { cleanupIDs: false },
          { removeComments: true },
          { removeEmptyAttrs: true },
          { removeEmptyText: true },
          { collapseGroups: true }
        ]
      })
  ])))
  .pipe(gulp.dest(paths.images.dest))
  .pipe(gulp.debug({
    title: `"Images"`
  }));
}