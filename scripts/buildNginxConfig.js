const path = require('path')
const shell = require('shelljs')
const handlebars = require('handlebars');
const chalk = require('react-dev-utils/chalk');
const argv = require('./tool/args.format')

const dirName = 'etc'

function touchFile(content, dist) {
  shell.echo(content).to(dist)
}

function readCliInfo() {
  // console.log('argv', argv)
  console.log(chalk.cyan('Starting to build nginx configuration \n'));
  console.log(chalk.cyan(
    `Attempting to environment variable: ${chalk.yellow(
      chalk.bold(JSON.stringify(argv))
    )}`
  ))
}

function createTempDir() {
  shell.mkdir('-p', path.resolve(process.cwd(), `./${dirName}`))
}

function removeTempDir() {
  shell.rm('-rf', path.resolve(process.cwd(), `./${dirName}/*`))
}

function createConfigFile() {
  var content = `server {
    listen {{PORT}};
    error_page 404  /404.html;
    server_name react-app;

    index index.htm index.html index.php;
    root {{ROOT}}; 

    location / { 
        try_files $uri /index.html;
    } 

    location /api/ { 
        proxy_pass {{HOST}};
    } 
}
`
  const root = path.resolve(process.cwd(), './build')
  const port = argv.PORT || 3000
  const host = argv.HOST || 'https://lnma.voxelcloud.net.cn/'
  const result = handlebars.compile(content)({ PORT: port, HOST: host, ROOT: root });
  var dist = path.resolve(process.cwd(), `./${dirName}/nginx-web.conf`)
  touchFile(result, dist)
  console.log(chalk.green('nginx config file has compiled successfully.\n'));
}

function init() {
  readCliInfo()
  removeTempDir()
  createTempDir()
  createConfigFile()
}

init()