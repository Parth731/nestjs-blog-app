import { fileType } from '../enum/file-types.enum';

export interface UploadFile {
  name: string;
  path: string;
  type: fileType;
  mime: string;
  size: number;
}
