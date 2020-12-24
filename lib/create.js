const inquirer = require('inquirer');
const fs = require(`fs`);
const Promise = require(`bluebird`);
const chalk = require('chalk');
const ora = require(`ora`);
const download = Promise.promisify(require(`download-git-repo`));
const spinner = ora(`正在下载模板…`);
function inquirerFn() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: '请输入项目名称:'
        },
        {
            type: 'input',
            name: 'version',
            message: '请输入项目版本'
        },
        {
            type: 'input',
            name: 'description',
            message: '请输入项目简介:'
        },
        {
            type: 'input',
            name: 'author',
            message: '请输入项目作者'
        }
    ]);
}


function downloadFn(answers, dirname) {
    const { name = dirname, version = '1.0.0', description = dirname, author } = answers;
    let url = `https://github.com:libertassss/project-template#master`;
    spinner.start();
    download(url, dirname, { clone: false }).then(() => {
        spinner.stop();
        const pkg = process.cwd() + `/${dirname}/package.json`;
        const content = JSON.parse(fs.readFileSync(pkg, `utf8`));
        content.name = name;
        content.version = version;
        content.author = author,
        content.description = description;
        const result = JSON.stringify(content);
        fs.writeFileSync(pkg, result);
    }).catch(err => {
        spinner.stop();
        console.log(chalk.red(`download template failed`));
        console.log(err);
    })
}

module.exports = {
    inquirerFn,
    downloadFn
}
