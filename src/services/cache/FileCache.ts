import CacheDriver from "services/cache/CacheDriver";
import * as fs from "fs";
import {createHash} from "crypto";
import Keyable from "types/Keyable";

/**
 * @author FaSh<farbodshams.2000@gmail.com>
 * @class FileCache
 * @implements CacheDriver
 * A file driver implementation from CacheDriver interface
 * @see CacheDriver
 */

class FileCache implements CacheDriver{
    /**
     * Holds path of cache files
     * @private
     */
    private basePath = process.env.PWD + "/storage/cache";

    /**
     * SHA-256 encoder
     * @param str
     * @private
     * @returns string
     */
    private static toSha256(str: string): string {
        str = str.toLowerCase()
        return createHash('sha256').update(str).digest('base64')
            .replace(/[/+]/g, '');
    }

    async clear(): Promise<void> {
        await fs.promises.unlink(this.basePath + "/*")
    }

    async delete(key: string): Promise<void> {
        const hashKey = FileCache.toSha256(key);
        try{
            await fs.promises.unlink(this.basePath + "/" + hashKey);
        } catch (e: any){
            console.log("Error Caught when unlinking cache file. Reason: " + e.message);
        }
    }

    async deleteMultiple(keys: Array<string>): Promise<void> {
        const len = keys.length;
        for(let i = 0; i < len; i++)
            await this.delete(keys[i]);
    }

    async get(key: string, defaultVal: string | null = null): Promise<any> {
        const hashedKey = FileCache.toSha256(key);
        const path = this.basePath + "/" + hashedKey;
        if(!fs.existsSync(path))
            return defaultVal;
        let data = (await fs.promises.readFile(path)).toString();
        let arrayify = data.split("|");
        const ttl = arrayify.shift() ?? "0";
        const timestamp = new Date().getTime();
        if(parseInt(ttl, 10) < timestamp) {
            await this.delete(key);
            return defaultVal;
        }
        data = arrayify.join("|");
        return JSON.parse(data);
    }

    async getMultiple(keys: Array<string>): Promise<Keyable> {
        let res: Keyable<string | null> = {};
        const keyLen = keys.length;
        for(let i = 0; i < keyLen; i++){
            res[keys[i]] = await this.get(keys[i]);
        }
        return res;
    }

    async has(key: string): Promise<boolean> {
        const path = this.basePath + "/" + FileCache.toSha256(key);
        if(!fs.existsSync(path))
            return false;
        const ttl = await this.getTTL(key);
        const timestamp = new Date().getTime();
        if(ttl < timestamp) {
            await this.delete(key);
            return false;
        }
        return true;
    }

    async set(key: string, val: any, ttl: number | undefined = undefined): Promise<void> {
        const timestamp = new Date().getTime();
        ttl = (typeof ttl === "undefined") ? (timestamp + 3.6e6) : (timestamp + (ttl * 1000));
        const data = ttl.toString() + "|" + JSON.stringify(val);
        await fs.promises.writeFile(this.basePath + "/" + FileCache.toSha256(key), data);
    }

    async setMultiple(keys: Keyable): Promise<void> {
        for(let key in keys){
            if(!keys.hasOwnProperty(key)) continue;
            await this.set(key, keys[key]);
        }
    }

    async getTTL(key: string): Promise<number> {
        let data = (await fs.promises.readFile(this.basePath + "/" + FileCache.toSha256(key))).toString();
        let arrayify = data.split("|");
        const cacheTs = parseInt(arrayify.shift() ?? "0");
        return Math.floor((cacheTs - new Date().getTime()) / 1000);
    }

}

export default FileCache;