import {Middleware} from "../types/Middleware";
import session from "next-session";

const withSession: Middleware = session({
    name: process.env.SESSION_KEY ?? "ngn_session",
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
    },
});

export default withSession;