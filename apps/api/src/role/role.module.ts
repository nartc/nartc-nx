import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role } from './models/role.model';
import './profiles/role.profile';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  controllers: [RoleController],
  imports: [
    MongooseModule.forFeature([{ name: Role.modelName, schema: Role.schema }])
  ],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule {}
