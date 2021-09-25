import CacheDriver from "./CacheDriver";
import {createClient} from 'redis';
import Keyable from "../../types/Keyable";
import {RedisClientType} from "redis/dist/lib/client";
import Logger from "../../services/logger/Logger";
import EnvKeyIsNotSetError from "../../errors/EnvKeyIsNotSetError";

/**
 * @author Navid<navid.abbaspoor@gmail.com>
 * @class RedisCache
 * @implements CacheDriver
 * A redis driver implementation from CacheDriver interface
 * @see CacheDriver
 */

class RedisCache implements CacheDriver {
    /**
     * Redis client
     * @private
     */
    private client: RedisClientType<any, any>;

    constructor() {
        if (!process.env.REDIS_URL) {
            throw new EnvKeyIsNotSetError("REDIS_URL is not set in environment variables");
        }
        this.client = createClient({
            url: process.env.REDIS_URL as string
        });
        this.client.on('error', (error: any) => Logger.getInstance().error('Redis Client Error', error));
    }

    private connection: boolean = false;

    private async connect() {
        const db_index = process.env?.REDIS_DB_INDEX ? parseInt(process.env.REDIS_DB_INDEX) : 0;
        if (!this.connection) {
            await this.client.connect();
            await this.client.select(db_index);
            this.connection = true;
        }
    }

    /**
     * SHA-256 encoder
     * @param str
     * @private
     * @returns string
     */
    private static toLowerCase(str: string): string {
        return str.toLowerCase();
    }

    async clear(): Promise<void> {
        await this.connect();
        await this.client.FLUSHALL();
    }

    async delete(key: string): Promise<void> {
        await this.connect();
        const hashKey = RedisCache.toLowerCase(key);
        try {
            await this.client.DEL(hashKey);
        } catch (e: any) {
            console.log("Error Caught when deleting key: " + e.message);
        }
    }

    async deleteMultiple(keys: Array<string>): Promise<void> {
        const len = keys.length;
        for (let i = 0; i < len; i++)
            await this.delete(keys[i]);
    }

    async get(key: string, defaultVal: string | null = null): Promise<any> {
        await this.connect();
        const data = await this.client.get(RedisCache.toLowerCase(key));
        return data ? JSON.parse(data) : defaultVal;
    }

    async getMultiple(keys: Array<string>): Promise<Keyable> {
        let res: Keyable<string | null> = {};
        const keyLen = keys.length;
        for (let i = 0; i < keyLen; i++) {
            res[keys[i]] = await this.get(keys[i]);
        }
        return res;
    }

    async has(key: string): Promise<boolean> {
        await this.connect();
        return await this.client.exists(RedisCache.toLowerCase(key));
    }

    async set(key: string, val: any, ttl: number | undefined = undefined): Promise<void> {
        await this.connect();
        const data = JSON.stringify(val);
        if (ttl && ttl > 0)
            await this.client.setEx(RedisCache.toLowerCase(key), Math.round(ttl), data);
        else
            await this.client.set(RedisCache.toLowerCase(key), data);
    }

    async setMultiple(keys: Keyable): Promise<void> {
        await this.connect();
        for (let key in keys) {
            if (!keys.hasOwnProperty(key)) continue;
            await this.set(key, keys[key]);
            await this.client.set(key, keys[key])
        }
    }

    async getTTL(key: string): Promise<number> {
        await this.connect();
        return await this.client.TTL(key);
    }

}

export default RedisCache;