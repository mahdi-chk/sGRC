type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVELS: Record<LogLevel, number> = {
    debug: 10,
    info: 20,
    warn: 30,
    error: 40,
};

const configuredLevel = (process.env.APP_LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug')).toLowerCase() as LogLevel;
const activeLevel = LOG_LEVELS[configuredLevel] ?? LOG_LEVELS.info;

function shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= activeLevel;
}

function serializeMeta(meta?: unknown): string {
    if (meta === undefined || meta === null) {
        return '';
    }

    if (meta instanceof Error) {
        return JSON.stringify({
            message: meta.message,
            stack: process.env.NODE_ENV === 'production' ? undefined : meta.stack,
        });
    }

    if (typeof meta === 'string') {
        return meta;
    }

    try {
        return JSON.stringify(meta);
    } catch (_error) {
        return String(meta);
    }
}

function write(level: LogLevel, scope: string, message: string, meta?: unknown): void {
    if (!shouldLog(level)) {
        return;
    }

    const timestamp = new Date().toISOString();
    const serializedMeta = serializeMeta(meta);
    const line = [`[${timestamp}]`, `[${level.toUpperCase()}]`, `[${scope}]`, message]
        .filter(Boolean)
        .join(' ');

    if (level === 'error') {
        console.error(serializedMeta ? `${line} ${serializedMeta}` : line);
        return;
    }

    if (level === 'warn') {
        console.warn(serializedMeta ? `${line} ${serializedMeta}` : line);
        return;
    }

    console.log(serializedMeta ? `${line} ${serializedMeta}` : line);
}

export const appLogger = {
    debug(scope: string, message: string, meta?: unknown): void {
        write('debug', scope, message, meta);
    },
    info(scope: string, message: string, meta?: unknown): void {
        write('info', scope, message, meta);
    },
    warn(scope: string, message: string, meta?: unknown): void {
        write('warn', scope, message, meta);
    },
    error(scope: string, message: string, meta?: unknown): void {
        write('error', scope, message, meta);
    },
};
