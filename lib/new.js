
const fs = require('fs');
const chalk = require('chalk');
const ora = require(`ora`);
const oraInstance = ora();
async function newComponent (dirname) {
    const dirPath = `${process.cwd()}/${dirname}`;
    const component = dirname.replace(/^\S/, s => s.toUpperCase()); 
    const data = `
import React, {FC} from 'react';
import './index.less';

interface ${component}Props {}

const ${component}: FC<${component}Props> = (props: ${component}Props) => {
    return <>${component}</>
}

export default ${component}
`
    const less =``;
    try {
        oraInstance.start(chalk.blueBright(`creating function ${dirname}`))
        oraInstance.color="blue";
       const result =  await fs.promises.mkdir(`${dirPath}`, { recursive: true })
       if(!result){
        oraInstance.fail(chalk.yellowBright(`component ${component} is exsited`));
        oraInstance.color="yellow";
         return;
       }
       oraInstance.succeed(chalk.greenBright('目录创建成功'));
       oraInstance.color="green";
    } catch (error) {
        console.log(error)
        oraInstance.color="red";
        oraInstance.fail(chalk.redBright('目录创建失败'));
    }
    try {
        oraInstance.start(chalk.blueBright('开始创建组件'))
        oraInstance.color="blue";
        await fs.promises.appendFile(`${dirPath}/index.tsx`, data )
        oraInstance.color="green";
        oraInstance.succeed(chalk.greenBright('组件创建成功'))
        oraInstance.start(chalk.blueBright('开始创建样式文件'))
        oraInstance.color="blue";
        await fs.promises.appendFile(`${dirPath}/index.less`, less )
        oraInstance.color="green";
        oraInstance.succeed(chalk.greenBright('样式文件创建成功'))
    } catch (error) {
        console.log(error)
        oraInstance.color="red";
        oraInstance.fail(chalk.redBright('组件创建失败'));
    }
    oraInstance.color="green";
    oraInstance.succeed(chalk.greenBright('恭喜，组件创建成功！'))
}

module.exports = {
    newComponent
}