import { Body } from '@nestjs/common';
import { SwaggerController } from '@/core/swagger';
import { AppSocketGateway } from '@/socket/socket.gateway';
import { NotificationDto } from './dto';
import { ServerRouter } from './server.router';

@SwaggerController({ tag: '앱' })
export class AppServerController {
  constructor(private readonly gateway: AppSocketGateway) {}

  @ServerRouter.SwaggerDocs({
    method: 'GET',
    path: ['/', '/docs', '/swagger'],
    redirect: '/docs',
  })
  async redirectSwaggerDocs(): Promise<void> {
    return;
  }

  @ServerRouter.Notification({
    method: 'POST',
    path: '/notification',
  })
  async notification(@Body() body: NotificationDto) {
    return this.gateway.notification(body);
  }
}
