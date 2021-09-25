const input = require("../input");
const createFile = require("../createFile");

const createApi = async () => {
    const name = await input("Select a path/name for your api endpoint: ");
    const useFormData = await input("Should your endpoint use form data as input type? [yes/no]: ") === 'yes';
    const stubPath = useFormData ? "./stubs/apiWithFormData.stub" : "./stubs/apiWithJson.stub";
    await createFile(name, "./pages/api", [stubPath]);
}

module.exports = createApi;