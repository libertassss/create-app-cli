const inquirer = require('inquirer');
const fs = require(`fs`);
const Promise = require(`bluebird`);
const chalk = require('chalk');
const ora = require(`ora`);
const download = Promise.promisify(require(`download-git-repo`));
const oraInstance = ora();
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
        },
        {
            type: 'checkbox',
            name: 'type',
            message: '请输入项目类型',
            choices: ['h5', 'pc']
        }
    ]);
}


function downloadFn(answers, dirname) {
    const { name = dirname, version = '1.0.0', description = dirname, author, type } = answers;
    let url = `https://github.com:libertassss/template#master`;
    if(type === 'h5'){
        url = `https://github.com:libertassss/react-multiple-template#master`;
    }
    oraInstance.start(chalk.greenBright('正在下载模板，请您耐心等待⌛️⌛️⌛️⌛️'))
    download(url, dirname, { clone: false }).then(() => {
        oraInstance.succeed(chalk.greenBright('恭喜，项目创建成功，现在您可以开始开发了'));
        const pkg = process.cwd() + `/${dirname}/package.json`;
        const content = JSON.parse(fs.readFileSync(pkg, `utf8`));
        content.name = name;
        content.version = version;
        content.author = author,
        content.description = description;
        const result = JSON.stringify(content);
        fs.writeFileSync(pkg, result);
    }).catch(err => {
        oraInstance.fail(chalk.red('downloading fail'))
    })
}

module.exports = {
    inquirerFn,
    downloadFn
}
