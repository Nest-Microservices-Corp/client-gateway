import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { NatsModule } from './transport/nats.module';
import { AuthModule } from './auth/auth.module';
import { HealtCheckModule } from './healt-check/healt-check.module';

@Module({
  imports: [

    ProductModule, 
    OrderModule, NatsModule, AuthModule, HealtCheckModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
