import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
// import { ORDERS_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { ChangeStatusOrderDto, CreateOrderDto, OrderPagerDto } from './dto';
import { NATS_SERVICE } from '../config/services';

@Controller('order')
export class OrderController {

  constructor(
    @Inject( NATS_SERVICE )
    private readonly _client: ClientProxy
  ) {}
  
  @Post()
  create( @Body() body: CreateOrderDto ) {

    return this._client.send( 'createOrder', body )
          .pipe(
            catchError( (err) => { throw new RpcException( err ) } )
          );

  }

  @Get()
  async findAll( @Query() query: OrderPagerDto ) {

    try {

      const response = await firstValueFrom(
        this._client.send( 'findAllOrder', query )
      );

      return response;
      
    } catch (error) {
      throw new RpcException( error );
    }

    // return this._client.send( 'findAllOrder', query )
    //       .pipe(
    //         catchError( (err) => { throw new RpcException( err ) } )
    //       );

  }

  @Get(':id')
  async findOne( @Param('id', ParseUUIDPipe) id: string ) {

    try {
      
      const response = await firstValueFrom(
        this._client.send( 'findOneOrder', {id} )
      );

      return response;
      
    } catch (error) {
      throw new RpcException( error );
    }

  }

  @Patch(':id')
  changeOrderStatus( @Param('id', ParseUUIDPipe) id: string, @Body() body: ChangeStatusOrderDto ) {

    return this._client.send( 
            'changeOrderStatus', 
            {
              id,
              ...body
            } )
          .pipe(
            catchError( (err) => { throw new RpcException( err ) } )
          );

  }


}
