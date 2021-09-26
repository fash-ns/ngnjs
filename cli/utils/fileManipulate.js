const fileManipulate = (data, name, status) => {
    const regex = new RegExp(`{B\/${name}}(.*){E/${name}}`, "g");
    return data.replace(regex, status ? "$1" : "");
}

module.exports = fileManipulate;