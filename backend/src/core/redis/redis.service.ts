import Redis from 'ioredis';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigKey } from '../configs';

@Injectable()
export class RedisService {
  private readonly $redis: Redis;

  constructor(private readonly configService: ConfigService) {
    this.$redis = new Redis(this.configService.get(ConfigKey.Redis));
  }

  async initSession(prefix: string) {
    await this.$redis.set(`session:${prefix}`, '[]');
  }

  async getSessions(prefix: string) {
    const keys = await this.$redis.get(`session:${prefix}`);
    return JSON.parse(keys) || [];
  }

  async getSession(prefix: string, id: string) {
    const keys = await this.$redis.get(`session:${prefix}`);
    return (JSON.parse(keys) || []).find((session: string) => session === id);
  }

  async setSession(prefix: string, id: string) {
    const keys = await this.$redis.get(`session:${prefix}`);
    const json = JSON.parse(keys) || [];
    json.push(id);
    await this.$redis.set(`session:${prefix}`, JSON.stringify(json));
    return json;
  }

  async deleteSession(prefix: string, id: string) {
    const keys = await this.$redis.get(`session:${prefix}`);
    const json = (JSON.parse(keys) || []).filter(
      (value: string) => value !== id,
    );
    await this.$redis.set(`session:${prefix}`, JSON.stringify(json));
    return json;
  }
}
