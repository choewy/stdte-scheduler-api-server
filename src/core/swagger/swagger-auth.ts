export class SwaggerAuth {
  public static Swagger = new SwaggerAuth('swagger', 'swagger@swagger.com');

  private readonly $name!: string;
  private readonly $email!: string;

  constructor(name: string, email: string) {
    this.$name = name;
    this.$email = email;
  }

  public get name() {
    return this.$name;
  }

  public get email() {
    return this.$email;
  }
}
