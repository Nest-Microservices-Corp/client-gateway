import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HealtCheckController {

  @Get()
  healtCheck() {
    return 'Client Gateway is up running!!!';
  }

}
