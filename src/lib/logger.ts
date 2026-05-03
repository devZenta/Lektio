import pino from "pino";

const logger = pino({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    formatters: {
        bindings: (bindings) => {
            return { 
                pid: bindings.pid, 
                hostname: bindings.hostname, 
                node_version: process.version 
            };
        },
        level: (label) => {
            return { severity: label.toUpperCase() };
        },
    },
    transport: process.env.NODE_ENV !== "production" 
        ? { 
            target: "pino-pretty", 
            options: { 
                colorize: true, 
                translateTime: "SYS:standard", 
                ignore: "pid,hostname,node_version", 
            }, 
        } 
        : undefined,
    timestamp: pino.stdTimeFunctions.isoTime,
});

export default logger;