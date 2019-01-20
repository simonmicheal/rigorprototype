import { Module } from '@nestjs/common';
import { UsersModule } from '../../rigor-services/src/service/users/users.module';

@Module({
  imports: [UsersModule],
})
export class ApplicationModule {}