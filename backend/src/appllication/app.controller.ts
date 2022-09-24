import { SwaggerController, SwaggerRouter } from '@/core/swagger';

@SwaggerController({ exclude: true })
export class AppController {
  @SwaggerRouter({
    method: 'GET',
    path: ['/', '/docs', '/swagger'],
    redirect: '/docs',
  })
  async redirectSwaggerDocs(): Promise<void> {
    return;
  }
}
