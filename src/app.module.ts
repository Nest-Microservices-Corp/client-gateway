import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { NatsModule } from './transport/nats.module';

@Module({
  imports: [

    ProductModule, 
    OrderModule, NatsModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
