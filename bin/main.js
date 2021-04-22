#!/usr/bin/env node

// 开始处理命令
const { program } = require('commander');
const inquirer = require('inquirer');
const fs = require(`fs`);
const chalk = require('chalk');
const version = require('../package.json');
const { downloadFn, inquirerFn } = require('../lib/create');
const { newComponent } = require('../lib/new');
const ora = require(`ora`);
const oraInstance = ora();

program.version(version.version, '-v,--version');
program.parse(process.argv);
program
  .command('init <dirname>')
  .description('create a new project')
  .action(dirname => {
    // 命令init触发时的回掉函数
    if (fs.existsSync(dirname)) {
      oraInstance.fail('init dirname 已存在');
      return;
    }
    inquirerFn().then(answers => {
      downloadFn(answers, dirname);
    });
  });

program.command('new <dirname>')
  .description('create a new component')
  .action(async dirname => {
    await newComponent(dirname)
});

// 如果输入没有注册的命令,输出帮助提示
program.arguments('<command>').action(cmd => {
  program.outputHelp();
  console.log(' ');
  console.log(`error: unknown option '${cmd}'`);
});
program.parse(process.argv);
// 如果没写参数,输出帮助提示
if (!process.argv.slice(2).length) {
  program.outputHelp();
}


