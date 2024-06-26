import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { NATS_SERVICE } from '../config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PagerDto } from '../common/dto/pager.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {

  //FIXME: injección de microservicio
  constructor(
    @Inject( NATS_SERVICE )
    private readonly _client: ClientProxy
  ) {}
  
  @Post()
  createProduct( @Body() createProductDto: CreateProductDto ) {
    
    return this._client.send( { cmd: 'create_product' }, createProductDto )
                .pipe(
                  catchError( (err) => { throw new RpcException( err ) } )
                );
    
  }

  @Get()
  findAll( @Query() query: PagerDto ) {
    //FIXME: llamado a un microservicio
    return this._client.send( { cmd: 'find_all_product' }, query );
  }

  @Get(':id')
  async findOne( @Param('id', ParseIntPipe) id: number ) {

    /**
     * forma corta
     */

    // return this._client.send( {cmd: 'find_one_product'}, {id} )
    //         .pipe(
    //           catchError( (err) => { throw new RpcException( err ) } )
    //         );

    
    try {
      
      const product = await firstValueFrom(
        this._client.send( {cmd: 'find_one_product'}, {id} )
      );
  
      return product;

    } catch (error) {
      throw new RpcException( error );
    }
     
  }

  @Patch(':id')
  updateProduct( @Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto ) {

    updateProductDto.id = id;
    
    return this._client.send( { cmd: 'update_product' }, updateProductDto )
                .pipe(
                  catchError( (err) => { throw new RpcException( err ) } )
                );

  }
 
  @Delete(':id')
  delete( @Param('id', ParseIntPipe) id: number ) {
    
    return this._client.send( { cmd: 'delete_product' }, {id} )
                .pipe(
                  catchError( (err) => { throw new RpcException( err ) } )
                );

  }

}
