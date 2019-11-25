import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AutomapperModule } from 'nestjsx-automapper';
import { AuthModule } from './auth/auth.module';
import { environment } from './environments/environment';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AutomapperModule.forRoot(),
    MongooseModule.forRoot(environment.mongo.uri, {
      retryAttempts: 5,
      retryDelay: 1000,
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }),
    RoleModule,
    UserModule,
    AuthModule
  ]
})
export class AppModule {}
