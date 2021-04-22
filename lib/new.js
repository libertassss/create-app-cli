
const fs =  require('fs/promises');
async function newComponent (dirname) {
    const dirPath = `${process.cwd()}/src/container/${dirname}`;
    const componentName = dirname.replace(/^\S/, s => s.toUpperCase()); 
    const data = `
    import React from 'react'
    interface ${componentName}Props {}
    const ${componentName}: FC<${componentName}Props> = (props: ${componentName}Props) => {
        return <>${componentName}</>
    }
    `
    try {
        await fs.mkdir(`${dirPath}/index.tsx`, { recursive: true })
    } catch (error) {
        console.log(error)
    }
    try {
        await fs.appendFile(`${dirPath}/index.tsx`, data )
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    newComponent
}