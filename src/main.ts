import { AppOptions, AppModule } from '@/app';
import { Bootstrap } from '@/bootstrap';
import { Settings as Luxon } from 'luxon';

Luxon.defaultZone = process.env.TZ;

const main = async () => {
  await Bootstrap.create(AppModule, AppOptions);
  await Bootstrap.setup();
  await Bootstrap.listen();
};

main();
