#!/usr/bin/env node

// 开始处理命令
const { program } = require('commander');
const fs = require(`fs`);
const chalk = require('chalk');
const package = require('../package.json');
const { downloadFn, inquirerFn } = require('../lib/create');


program.version(package.version, '-v,--version');
program.parse(process.argv);
program
  .command('init <dirname>')
  .description('create a new project')
  .action(dirname => {
    console.log(dirname)
    // 命令init触发时的回掉函数
    if (fs.existsSync(dirname)) {
      return console.log(chalk.red(`dirname ${dirname} is exist`));
    }
    inquirerFn().then(answers => {
      downloadFn(answers, dirname);
    });
  })


