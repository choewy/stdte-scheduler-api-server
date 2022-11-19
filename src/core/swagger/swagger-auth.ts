export class SwaggerAuth {
  public static Test = new SwaggerAuth('test', 'swagger-test');

  private readonly $name!: string;
  private readonly $token!: string;

  constructor(name: string, token: string) {
    this.$name = name;
    this.$token = token;
  }

  public get name() {
    return this.$name;
  }

  public get token() {
    return this.$token;
  }
}
