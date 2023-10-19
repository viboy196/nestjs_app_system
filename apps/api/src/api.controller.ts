import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(ApiController.name)
@Controller('test1')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('hello')
  getHello(): string {
    return this.apiService.getHello();
  }

  @Get('hello1')
  getHello1(): string {
    return this.apiService.getHello();
  }
  @Post('hello2')
  getHello2(@Body() anhdan: string): string {
    Logger.log(anhdan);
    return this.apiService.getHello();
  }
  @Get('hello3')
  getHello3(): string {
    return this.apiService.getHello();
  }
  @Get('hello4')
  getHello4(): string {
    return this.apiService.getHello();
  }
}
