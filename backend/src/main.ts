import { Settings as Luxon } from 'luxon';
import { AppModule } from '@/app';
import { Bootstrap } from '@/bootstrap';

Luxon.defaultZone = 'Asia/Seoul';

new Bootstrap().create(AppModule);
