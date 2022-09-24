import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage, StorageEngine } from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';

const storageEngine: StorageEngine = diskStorage({
  destination(_req, _file, callback) {
    callback(null, './temp');
  },
  filename(_req, file, callback) {
    const extenstion = extname(file.originalname);
    const filename = `${uuid()}${extenstion}`;
    callback(null, filename);
  },
});

export const MulterFilesInterceptor = AnyFilesInterceptor({
  storage: storageEngine,
});
