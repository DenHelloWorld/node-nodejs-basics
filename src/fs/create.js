import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, 'files', 'fresh.txt');

  try {
    await fs.access(filePath);
    throw new Error('FS operation failed');
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(error.message);
      return;
    }

    await fs.writeFile(filePath, 'I am fresh and young', { flag: 'wx' });
    console.log('File created');
  }
};

await create();
