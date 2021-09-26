import {Middleware} from "../types/Middleware";
import nextSession from "next-session";

const session = nextSession({
    name: process.env.SESSION_KEY ?? "ngn_session",
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
    },
});

const withSession: Middleware = async (req, res, next) => {
    await session(req, res);
    next();
}

export default withSession;