import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Express } from 'express';
import { Upload } from 'src/uploads/upload.entity';
import { Repository } from 'typeorm';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { UploadFile } from 'src/uploads/interfaces/upload-file.interface';
import { ConfigService } from '@nestjs/config';
import { fileType } from 'src/uploads/enum/file-types.enum';

@Injectable()
export class UploadService {
  constructor(
    /**
     * inject uploadToAwsProvider
     */
    private readonly uploadToAwsProvider: UploadToAwsProvider,
    /**
     * inject configService
     */
    private readonly configService: ConfigService,
    /**
     * inject uploadRepository
     */
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
  ) {}
  public async uploadFile(file: Express.Multer.File) {
    try {
      //throw error for unsupported NIME type
      if (
        !['image/gif', 'image/jpeg', 'image/jpg', 'image/png'].includes(
          file.mimetype,
        )
      ) {
        throw new BadRequestException('Mime Type not supported');
      }
      //upload to the file to aws s3
      const name = await this.uploadToAwsProvider.fileUpload(file);
      //generate  to a new entry in the database
      const uploadFile: UploadFile = {
        name: name,
        path: `https:${this.configService.get('appConfig.awsCloudFrontUrl')}/${name}`,
        mime: file.mimetype,
        size: file.size,
        type: fileType.IMAGE,
      };

      const upload = this.uploadRepository.create(uploadFile);
      return await this.uploadRepository.save(upload);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
