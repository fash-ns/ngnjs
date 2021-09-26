const fileManipulate = (data: string, name: string, status: boolean) => {
    const regex = new RegExp(`{B\/${name}}(.*){E/${name}}`, "g");
    return data.replace(regex, status ? "$1" : "");
}

export default fileManipulate;