import { EnvsEnum } from './enums';

const $env = process.env.NODE_ENV;

export class NodeEnv {
  public static Local = new NodeEnv(EnvsEnum.Local);
  public static Dev = new NodeEnv(EnvsEnum.Dev);
  public static Prod = new NodeEnv(EnvsEnum.Prod);

  public static get value(): string {
    return $env;
  }

  constructor(private readonly env: EnvsEnum) {}

  get value(): string {
    return $env;
  }

  public equal(): boolean {
    return $env === this.env;
  }
}
