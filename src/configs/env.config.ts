import dotenv from 'dotenv';
import { RedisOptions } from 'ioredis';
import { Options } from 'sequelize';

dotenv.config();

export const isTest = process.env.NODE_ENV === 'test';
export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';

export const TEST_MODEL = process.env.TEST_MODEL;

export const serverConfig = {
  host: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT ? Number(process.env.PORT) : 8000,
};

export const dbConfig: Options = {
  logging: isDev,
  dialect: 'postgres',
  host: process.env.DB_HOST!,
  port: +process.env.DB_PORT!,
  database: process.env.DB_NAME!,
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  ...(isProd && {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }),
};

export const redisConfig: RedisOptions = {
  host: process.env.REDIS_HOST!,
  port: +process.env.REDIS_PORT!,
  ...(process.env.REDIS_USER && { username: process.env.REDIS_USER }),
  ...(process.env.REDIS_PASSWORD && { password: process.env.REDIS_PASSWORD }),
  showFriendlyErrorStack: true,
  enableOfflineQueue: false,
  maxRetriesPerRequest: null,
  db: 0,
};

export const jwtConfig = {
  secretKey: process.env.JWT_SECRET_KEY!,
  defaultExpiresIn: process.env.JWT_DEFAULT_EXPIRES_IN!,
  accessExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN!,
  refreshExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN!,
};

export const cookiesConfig = {
  secretKey: process.env.COOKIES_SECRET_KEY!,
  maxAge: +process.env.COOKIES_MAX_AGE!,
};

export const SESSION_SECRET = process.env.SESSION_SECRET!;

export const HASHING_SALT = process.env.HASHING_SALT!;

export const OPEN_API_KEY = process.env.OPEN_API_KEY;
