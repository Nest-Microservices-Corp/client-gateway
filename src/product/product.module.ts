import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { NatsModule } from '../transport/nats.module';

@Module({
  controllers: [ProductController],
  providers: [],
  imports: [
    NatsModule
  ],
})
export class ProductModule {}
