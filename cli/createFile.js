const fs = require("fs");

const createFile = async (name, basePath, stubPaths, ext = 'ts') => {
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
    let file = "";
    stubPaths.forEach(stubPath => file += fs.readFileSync(process.cwd() + '/node_modules/ngn/' + stubPath).toString())
    file = file.replace(/{name}/g, fileName);
    await fs.promises.mkdir(`${basePath}/${dirName}`, {recursive: true});
    await fs.promises.writeFile(filePath, file);
    return true;
}

module.exports = createFile;