import { Catch, ArgumentsHost, ExceptionFilter, BadRequestException, HttpStatus, NotFoundException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
// import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

interface IError {
  status: HttpStatus;
  message: string;
}

@Catch(RpcException)                             // RpcExceptionFilter<RpcException>
export class RpcCustomExceptionFilter implements ExceptionFilter {

  catch( exception: RpcException, host: ArgumentsHost ) {

    const ctx = host.switchToHttp();
    const response =  ctx.getResponse();
    const rpcError = exception.getError() as any;

    const messageError = rpcError.toString();
    
    console.log('messageError ::: ', messageError);
    console.log('rpcError ::: ', {rpcError});

    if( messageError.includes('Empty response') ) {
      //FIXME: notificar a los admin
      return response.status( HttpStatus.INTERNAL_SERVER_ERROR ).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: messageError.substring(0, messageError.indexOf('(') - 1)
      });
    }

    if( typeof rpcError === 'object' && 'status' in rpcError && 'message' in rpcError ) {

      const status = rpcError.status;

      if( typeof status === 'string' ) {
        return response.status( HttpStatus.BAD_REQUEST ).json({
          status: HttpStatus.BAD_REQUEST,
          message: rpcError.message
        });
      }

      const errorObj: IError = rpcError as IError;

      return response.status( errorObj.status ).json({
        status: HttpStatus.BAD_REQUEST,
        message: rpcError.message
      });

    }
      
    return response.status( HttpStatus.BAD_REQUEST ).json(rpcError.error);

  }

}