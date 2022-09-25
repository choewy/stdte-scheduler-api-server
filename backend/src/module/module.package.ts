import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth';
import { UserModule } from './user';

const modules = [AuthModule, UserModule];
const routers = modules.map((module) => ({ path: 'api/v1', module }));

@Module({
  imports: [...modules, RouterModule.register(routers)],
})
export class ModulePackage {}
