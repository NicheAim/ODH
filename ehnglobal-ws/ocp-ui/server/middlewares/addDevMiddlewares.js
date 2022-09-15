/* eslint-disable no-console */
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const proxy = require('express-http-proxy');
const chalk = require('chalk');

function createWebpackMiddleware(compiler, publicPath) {
  return webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath,
    silent: true,
    stats: 'errors-only',
  });
}

module.exports = function addDevMiddlewares(app, webpackConfig) {
  const compiler = webpack(webpackConfig);
  const middleware = createWebpackMiddleware(compiler, webpackConfig.output.publicPath);

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  const check = '✓';
  const cross = '✗';
  const routes = [
    { route: '/ocp-ui-api', url: 'http://localhost:8446' },
    { route: '/smart', url: 'http://localhost:8449' },
  ];
  if (proxy) {
    console.log('proxy setup:');
    routes.forEach(({ route, url }) => {
      app.use(route, proxy(url));
      console.log(`\t ${route} -> ${url} ${(chalk && chalk.green(check)) || check}`);
    });
  } else {
    routes.forEach(({ route, url }) => {
      console.log(`\t ${route} -> ${url} ${(chalk && chalk.green(cross)) || cross}`);
    });
  }

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;

  app.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
};
