export * from './enums';
export * from './interfaces';

import server from './server.config';
import typeorm from './typeorm.config';
import jwt from './jwt.config';
import kakao from './kakao.config';
import redis from './redis.config';

export const configs = [server, typeorm, jwt, kakao, redis];
