import input from "../utils/input";
import makeFileFromStub from "../utils/makeFileFromStub";

const createApi = async () => {
    const name = await input("Select a path/name for your api endpoint: ");
    const useFormData = await input("Should your endpoint use form data as input type? [yes/no]: ") === 'yes';
    await makeFileFromStub(name, "./pages/api", "/api.stub", {formData: useFormData});
}

export = createApi;