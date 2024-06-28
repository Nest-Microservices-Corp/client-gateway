import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { NatsModule } from './transport/nats.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [

    ProductModule, 
    OrderModule, NatsModule, AuthModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
