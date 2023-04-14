import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(): Promise<{ message: string }> {
    await new Promise((r) => setTimeout(r, 2000));
    return { message: 'Hello World!' };
  }
}
