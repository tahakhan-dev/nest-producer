import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject('any_name_i_want') private readonly client: ClientKafka,) { }
  @Post('useractivitylog')
  getHello(@Body() userActivityBody: any): any {

    return this.client.emit('useractivitylog', {
      key: `${userActivityBody.ipAddress}`,
      value: JSON.stringify({
        userId: userActivityBody.userId,
        userName: userActivityBody.userName,
        ipAddress: userActivityBody.ipAddress,
        pageVisited: userActivityBody.pageVisited,
        city: userActivityBody.city,
        countryCode: userActivityBody.countryCode,
        countryName: userActivityBody.countryName,
        latitude: userActivityBody.latitude,
        longitude: userActivityBody.longitude,
        postal: userActivityBody.postal,
        state: userActivityBody.state,
      }),
    },)
  }
}
