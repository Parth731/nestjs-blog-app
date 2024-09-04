import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiHeaders, ApiOperation } from '@nestjs/swagger';
import { Express } from 'express';
import { UploadService } from './providers/upload.service';

@Controller('uploads')
export class UploadsController {
  constructor(
    /**
     * inject uploadService
     */
    private readonly uploadService: UploadService,
  ) {}
  @UseInterceptors(FileInterceptor('file'))
  @ApiHeaders([
    { name: 'content-Type', description: 'multipart/form-data' },
    { name: 'Authorization', description: 'Bearer Token' },
  ])
  @ApiOperation({
    summary: 'Upload a new image to the server',
    description: 'Upload File',
  })
  @Post('file')
  public uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadFile(file);
  }
}
