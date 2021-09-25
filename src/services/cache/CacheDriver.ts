import Keyable from "../../types/Keyable";

/**
 * @author FaSh<farbodshams.2000@gmail.com>
 * @interface CacheDriver
 * Interface for cache drivers
 */

interface CacheDriver{
    /**
     * Returns value of a key if the key is existed and defaultVal otherwise
     * @param key
     * @param defaultVal
     * @returns Promise<any>
     */
    get(key: string, defaultVal: string | null): Promise<any>;

    /**
     * Sets a key in cache with the provided value for a specific time which
     * is set with TTL (TTL is in seconds)
     * @param key
     * @param val
     * @param ttl
     * @returns Promise<void>
     */
    set(key: string, val: any, ttl: number): Promise<void>;

    /**
     * Deletes a key from cache
     * @param key
     * @returns Promise<void>
     */
    delete(key: string): Promise<void>;

    /**
     * Deletes all cached keys
     * @returns Promise<void>
     */
    clear(): Promise<void>;

    /**
     * Returns value of provided keys in a Keyable (Key-Value) format
     * @param keys
     * @returns Promise<Keyable>
     */
    getMultiple(keys: Array<string>): Promise<Keyable>;

    /**
     * Sets multiple key-values to cache
     * @param keys
     * @returns Promise<void>
     */
    setMultiple(keys: Keyable): Promise<void>;

    /**
     * Gets an array of keys and delete them
     * @param keys
     * @returns Promise<void>
     */
    deleteMultiple(keys: Array<string>): Promise<void>;

    /**
     * returns the time-to-live of given key in unix-based timestamp
     * @param key
     * @returns Promise<number>
     */
    getTTL(key: string): Promise<number>;

    /**
     * Gets a key and check if the key is existed
     * @param key
     * @returns Promise<boolean>
     */
    has(key: string): Promise<boolean>;
}

export default CacheDriver;