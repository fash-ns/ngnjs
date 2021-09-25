class Random{
    private static strPool: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    private static hexPool: string = '0123456789abcdef';
    private static base64Pool: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/';
    private static base64UrlPool: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
    private static numPool: string = '0123456789';
    private static charPool: string = '=-][\\\';/.,<>?:"|{}+_)(*&^%$#@!';

    private static generateByPool(length: number, pool: string){
        const len: number = pool.length;
        let res: string = '';
        for(let i: number = 0; i < length; i++){
            let index: number = Math.floor(Math.random() * (len - 1));
            res += pool[index];
        }
        return res;
    }

    public static string(length: number): string{
        return Random.generateByPool(length, Random.strPool);
    }

    public static number(length: number): string{
        return Random.generateByPool(length, Random.numPool);
    }

    public static numberBetween(min: number, max: number): number{
        return Math.floor((Math.random() * (max - min)) + min);
    }

    public static mixed(length: number): string{
        const pool: string = Random.strPool + Random.charPool;
        return Random.generateByPool(length, pool);
    }

    public static hex(length: number, prefixed: boolean = false): string{
        return (prefixed ? "0x" : "") + Random.generateByPool(length, Random.hexPool);
    }

    public static base64(length: number, urlEncoded: boolean = false): string{
        const pool = urlEncoded ? Random.base64UrlPool : this.base64Pool;
        let res = Random.generateByPool(length, pool);
        while(res.length % 4 != 0)
            res = res + '=';
        return res;
    }
}

export default Random;