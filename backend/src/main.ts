import { Bootstrap } from './bootstrap';
import { AppModule } from '@/appllication';

const bootstrap = async () => {
  const app = new Bootstrap(AppModule);
  await app.init();
  await app.listen();
};

bootstrap();
