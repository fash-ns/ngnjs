const fs = require("fs");
const fileManipulate = require("../utils/fileManipulate");

const createFile = async (name, basePath, stubPath, manipulation = {}, context = {}, ext = 'ts') => {
    const basePathNestedLevel = basePath.split('/').length;
    basePath = process.cwd() + '/' + basePath;
    name = name.replace(/\s/g, '');
    const arrName = name.split('/');
    const fileName = arrName.pop();
    const dirName = arrName.join('/');
    const filePath = `${basePath}/${dirName}/${fileName}.${ext}`;
    if(fs.existsSync(filePath)){
        console.log("\x1b[31mSelected file '" + filePath + "' is already exists");
        return false;
    }
    let file = fs.readFileSync(process.cwd() + '/node_modules/ngnjs/' + stubPath).toString();
    for (let key in manipulation){
        if(!manipulation.hasOwnProperty(key)) continue;
        file = fileManipulate(file, key, manipulation[key]);
    }
    context.name = fileName;
    context.pathToRoot = '../'.repeat(basePathNestedLevel + arrName.length - 1);

    for (let key in context){
        if(!context.hasOwnProperty(key)) continue;
        const regex = new RegExp(`{${key}}`, 'g');
        file = file.replace(regex, context[key]);
    }
    file = file.replace(/\n{3,}/g, "\n\n");
    await fs.promises.mkdir(`${basePath}/${dirName}`, {recursive: true});
    await fs.promises.writeFile(filePath, file);
    return true;
}

module.exports = createFile;