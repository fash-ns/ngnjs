import sampleProviders from "../../config/providers";
import loadConfFile from "./loadConfFile";

const cache = () => {
    const providers = loadConfFile('config/providers', sampleProviders);
    return providers.cache
}

export default cache;