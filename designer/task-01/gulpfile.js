const babel = require('gulp-babel')
const gulp = require('gulp')
const browserSync = require('browser-sync')

const server = browserSync.create()

const paths = {
  scripts: {
    src: 'src/js/*.js',
    dest: 'dist/js/'
  }
}

function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(gulp.dest(paths.scripts.dest))
}

function reload(done) {
  server.reload()
  done()
}

function serve(done) {
  server.init({
    server: {
      baseDir: './'
    }
  })
  done()
}

const watch = () => gulp.watch(paths.scripts.src, gulp.series(scripts, reload))

const dev = gulp.series(scripts, serve, watch)

module.exports = { dev }
