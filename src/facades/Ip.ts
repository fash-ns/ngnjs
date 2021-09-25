/**
 * @author FaSh<farbodshams.2000@gmail.com>
 * @class Ip
 * Some utils to work with IP addresses
 */

class Ip{

    /**
     * validates an ip address using its protocol version
     * @param ip
     * @param version
     * @returns true on validation and false on invalidation
     */
    public static validateVersion(ip: string, version: 4|6 = 4): boolean{
        let netmask = "32";
        if(ip.includes("/")){
            [ip, netmask] = ip.split("/");
        }
        const ipv4Regex = new RegExp("^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$")
        const ipv6Regex = new RegExp("(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]+|::(ffff(:0{1,4})?:)?((25[0-5]|(2[0-4]|1?[0-9])?[0-9])\\.){3}(25[0-5]|(2[0-4]|1?[0-9])?[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1?[0-9])?[0-9])\\.){3}(25[0-5]|(2[0-4]|1?[0-9])?[0-9]))");
        const netmaskNumbered = parseInt(netmask);
        if(netmaskNumbered < 0 || netmaskNumbered > 32)
            return false;
        return version == 4 ? ipv4Regex.test(ip) : ipv6Regex.test(ip);
    }

    /**
     * validates an IPv4 or IPv6 with a netmask
     * @param ip
     * @returns true on validation and false on invalidation
     */
    public static validate(ip: string): boolean{
        return Ip.validateVersion(ip, 4) || Ip.validateVersion(ip, 6);
    }
}

export default Ip;