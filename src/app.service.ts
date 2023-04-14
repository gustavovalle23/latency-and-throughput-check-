import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    await new Promise((r) => setTimeout(r, 2580));
    return 'Hello World!';
  }
}
