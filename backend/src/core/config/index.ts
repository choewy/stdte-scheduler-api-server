export * from './enums';
export * from './interfaces';

import server from './server.config';
import cors from './cors.config';
import auth from './auth.config';
import master from './master.config';
import admin from './admin.config';
import swagger from './swagger.config';
import typeorm from './typeorm.config';

export const config = [server, cors, auth, master, admin, swagger, typeorm];
