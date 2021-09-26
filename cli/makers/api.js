const input = require("../utils/input");
const createFile = require("../utils/createFile");

const createApi = async () => {
    const name = await input("Select a path/name for your api endpoint: ");
    const useFormData = await input("Should your endpoint use form data as input type? [yes/no]: ") === 'yes';
    await createFile(name, "./pages/api", "./stubs/api.stub", {formData: useFormData});
}

module.exports = createApi;