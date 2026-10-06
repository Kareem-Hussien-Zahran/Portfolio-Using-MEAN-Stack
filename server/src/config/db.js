import dns from "node:dns";
import mongoose from "mongoose";

/**
 * Public DNS resolvers used for MongoDB Atlas `mongodb+srv://` lookups.
 * Some networks/ISPs refuse SRV queries (error: `querySrv ECONNREFUSED`); resolving through these fixes it.
 * Override with DNS_SERVERS=ip1,ip2 in .env.
 */
const DEFAULT_DNS_SERVERS = ["208.67.222.222", "1.1.1.1"];

const LOCAL_FALLBACK = "mongodb://127.0.0.1:27017/portfolio";

export const applyDnsServers = () => {
    const servers = process.env.DNS_SERVERS
        ? process.env.DNS_SERVERS.split(",").map((s) => s.trim()).filter(Boolean)
        : DEFAULT_DNS_SERVERS;
    dns.setServers(servers);
    return servers;
};

/** Connection string with the credentials hidden – safe to print. */
export const redactUri = (uri) => uri.replace(/\/\/[^@/]*@/, "//***@");

/** Connects Mongoose to MongoDB Atlas (or any MongoDB) using MONGODB_URI. Throws an Error with a helpful message. */
export const connectDB = async () => {
    const uri = process.env.MONGODB_URI || LOCAL_FALLBACK;

    if (/[<>]/.test(uri))
        throw new Error("MONGODB_URI still contains a <placeholder>. Paste your real Atlas connection string into server/.env");

    applyDnsServers();

    try {
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
    } catch (e) {
        let hint = "";
        if (e.syscall === "querySrv" || /querySrv|ENOTFOUND|ECONNREFUSED/.test(e.message))
            hint = "\n  → DNS lookup failed. Check your internet connection and the cluster host name in MONGODB_URI.";
        else if (/Authentication failed|bad auth/i.test(e.message))
            hint = "\n  → Wrong database user or password (special characters in the password must be URL-encoded).";
        else if (/ReplicaSetNoPrimary|Server selection timed out|timed out/i.test(e.message))
            hint = "\n  → Atlas is not reachable. In Atlas → Network Access, add your current IP address (or 0.0.0.0/0 for testing).";
        throw new Error(`Could not connect to MongoDB (${redactUri(uri)})\n  ${e.message}${hint}`);
    }
    return { uri: redactUri(uri), name: mongoose.connection.name, host: mongoose.connection.host };
};
