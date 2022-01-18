import { Injectable } from '@nestjs/common';
import { tar } from 'compressing';
import { ConfigService } from 'nestjs-config';
import { systemOs } from 'src/common/utils/PublicFunction';

@Injectable()
export class updateFilsService {
  constructor(private readonly configService: ConfigService) {}
  upload(file) {
    const { path } = file;
    const [, filePath] = path.split('uploads');
    console.log(filePath);
    return {
      ...file,
      accessPath: `http://${systemOs.IP()}:4000${filePath}`,
    };
  }
}
