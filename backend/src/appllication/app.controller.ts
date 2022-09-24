import { SwaggerController, SwaggerRouter } from '@/core/swagger';

@SwaggerController({ exclude: true })
export class AppController {
  @SwaggerRouter('GET', ['/', '/docs', '/swagger'], '/docs')
  redirectSwaggerDocs(): void {
    return;
  }
}
