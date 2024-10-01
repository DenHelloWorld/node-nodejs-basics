import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';

const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, 'files', 'fresh.txt');

  const fileExists = await fs
    .access(filePath)
    .then(() => true)
    .catch(() => false);

  if (fileExists) {
    throw new Error('FS operation failed');
  }

  await fs.writeFile(filePath, 'I am fresh and young', { flag: 'wx' });
};

await create();
