const gulp = require('gulp');
const less = require('gulp-less');
const server = require('gulp-server-livereload');
const eslint = require('gulp-eslint');
const browserify = require('browserify');
const envify = require('envify/custom');
const watchify = require('watchify');
const gutil = require('gutil');
const source = require('vinyl-source-stream');
const gulpDoxx = require('gulp-doxx');

gulp.task('default', ['build', 'copySprites', 'watch', 'server']);
gulp.task('build', ['less', 'copySprites', 'copyVendorAssets', 'lint', 'browserify']);

gulp.task('watch', () => {
  // gulp.watch('src/**/*.js', ['lint']);
  gulp.watch('src/**/*.less', ['less']);
  gulp.watch('src/**/*.js', ['lint', 'browserify']);
});

// Compile less
gulp.task('less', () => gulp.src('src/**/*.less')
  .pipe(less())
  .pipe(gulp.dest('dist')));


// Serve and live reload at localhost:8000
gulp.task('server', () => {
  gulp.src('.')
    .pipe(server({
      livereload: {
        enable: true,
        filter: (filePath, cb) => cb(/src/.test(filePath))
      },
      directoryListing: true,
      open: false
    }));
});

// Copy sprites to dist
gulp.task('copySprites', () => gulp.src('src/atlases/**/*.*')
  .pipe(gulp.dest('dist/atlases'))
);

gulp.task('copyVendorAssets', () => {
  return gulp.src([
    'node_modules/phaser/build/phaser.js',
  ]).pipe(gulp.dest('dist/vendor'));
});

const browserifyOpts = {
  entries: ['./src/game.js'],
  debug: true
};
const opts = Object.assign({}, watchify.args, browserifyOpts);
const bundler = watchify(browserify(opts));
bundler.transform('babelify', {
  'presets': ['es2015'],
  'plugins': [
    ['transform-runtime', {
      'polyfill': false,
      'regenerator': true
    }]
  ]
})
.transform({ global: true }, envify({
  NODE_ENV: 'development'
}));
gulp.task('browserify', bundle);
bundler.on('update', bundle);
bundler.on('log', gutil.log);
function bundle () {
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('main.bundle.js'))
    .pipe(gulp.dest('./dist/js'));
}

gulp.task('lint', function () {
  return gulp.src(['src/**/*.js', '!node_modules/**', '!src/vendor/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('docs', function () {
  gulp.src(['src/**/*.js', '!src/vendor/*.js', 'README.md'], { base: '.' })
    .pipe(gulpDoxx({
      title: 'zombie'
    }))
    .pipe(gulp.dest('docs'));
});
