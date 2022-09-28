import { Bootstrap } from './bootstrap';
import { AppModule } from '@/appllication';
import { Settings as Luxon } from 'luxon';

Luxon.defaultZone = 'Asia/Seoul';

const bootstrap = async () => {
  const app = new Bootstrap(AppModule);
  await app.init();
  await app.listen();
};

bootstrap();
