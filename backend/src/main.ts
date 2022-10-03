import { Bootstrap } from './bootstrap';
import { AppServerModule } from '@/server';
import { Settings as Luxon } from 'luxon';

Luxon.defaultZone = 'Asia/Seoul';

const bootstrap = async () => {
  const app = new Bootstrap(AppServerModule);
  await app.init();
  await app.listen();
};

bootstrap();
