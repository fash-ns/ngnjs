import mongoose, {Mongoose} from "mongoose";
import EnvKeyIsNotSetError from "errors/EnvKeyIsNotSetError";
import DatabaseError from "../errors/DatabaseError";

class DB{
    private static connection: Mongoose | undefined;

    private constructor() {}
    public static async getConnection(){
        if(typeof DB.connection === "undefined") {
            const dbUri: string | undefined = process.env.DATABASE;
            if (typeof dbUri === "undefined")
                throw new EnvKeyIsNotSetError("Database connection uri env variable is not set");
            DB.connection = await mongoose.connect(dbUri);
            const connection = DB.connection.connection;
            connection.on('error', (err) => {
                throw new DatabaseError(err);
            });
        }
        return DB.connection;
    }
}

export default DB;