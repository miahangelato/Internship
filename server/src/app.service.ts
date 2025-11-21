import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AxiosError } from 'axios';


@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<any[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<any[]>('http://localhost:3000/cats').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data ?? error.message);
          throw new Error('An error happened!');
        }),
      ),
    );
    return data;
  }
}
