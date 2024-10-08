import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
const url = 'https://viacep.com.br/ws/{cep}/json';
const url2 = 'https://api.postmon.com.br/v1/cep/{cep}';
const url3 = 'https://opencep.com/v1/{cep}';
@Injectable()
export class CepService {
  constructor(
    private readonly httpService: HttpService,
    private prismaService: PrismaService,
  ) {}
  async findGetByCep(cep: string): Promise<AxiosResponse<any>> {
    return this.httpService.axiosRef
      .get(url.replace('{cep}', cep), { timeout: 3000 })
      .then((result) => {
        return {
          data: result.data,
          status: result.status,
          statusText: result.statusText,
          headers: result.headers,
          config: result.config,
        };
      })
      .catch(() => {
        throw new BadRequestException('Cep Inválido');
      });
  }

  async findGetByCep2(cep2: string): Promise<AxiosResponse<any>> {
    return this.httpService.axiosRef
      .get(url2.replace('{cep}', cep2), { timeout: 3000 })
      .then((result) => {
        return {
          data: result.data,
          status: result.status,
          statusText: result.statusText,
          headers: result.headers,
          config: result.config,
        };
      })
      .catch(() => {
        throw new BadRequestException('Cep Inválido');
      });
  }
  async findGetByCep3(cep3: string): Promise<AxiosResponse<any>> {
    return this.httpService.axiosRef
      .get(url3.replace('{cep}', cep3), { timeout: 3000 })
      .then((result) => {
        return {
          data: result.data,
          status: result.status,
          statusText: result.statusText,
          headers: result.headers,
          config: result.config,
        };
      })
      .catch(() => {
        throw new BadRequestException('Cep Inválido');
      });
  }
  findGetCepByDB(cep: string) {
    return this.prismaService.cep.findFirst({
      where: {
        cep: cep,
      },
    });
  }
}
