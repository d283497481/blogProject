import { join } from 'path';
import { diskStorage } from 'multer';
import { nanoid } from 'nanoid';

export default {
  root: join(__dirname, '../uploads'),
  storage: diskStorage({
    destination: join(
      __dirname,
      `../uploads/${new Date().toLocaleDateString()}`,
    ),
    filename: (req, file, cb) => {
      const filename = `${nanoid()}.${file.mimetype.split('/')[1]}`;
      return cb(null, filename);
    },
  }),
};
