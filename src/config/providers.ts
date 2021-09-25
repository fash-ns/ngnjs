import {ProviderList} from "types/ProviderList";
import RedisCache from "services/cache/RedisCache";

const providers: ProviderList = {
    cache: new RedisCache()
}

export default providers;