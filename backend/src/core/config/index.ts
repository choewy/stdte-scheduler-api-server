export * from './enums';
export * from './interfaces';

import server from './server.config';
import cors from './cors.config';
import auth from './auth.config';
import swagger from './swagger.config';
import typeorm from './typeorm.config';

export const config = [server, cors, auth, swagger, typeorm];
