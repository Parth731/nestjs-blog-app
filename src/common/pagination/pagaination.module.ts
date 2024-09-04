import { Module } from '@nestjs/common';
import { PagainationProvider } from './provider/pagaination.provider';

@Module({
  providers: [PagainationProvider],
  exports: [PagainationProvider],
})
export class PagainationModule {}
