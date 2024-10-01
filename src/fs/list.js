import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const list = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filesDir = join(__dirname, 'files');

  try {
    await fs.access(filesDir);
  } catch {
    console.error('FS operation failed');
    return;
  }

  try {
    const files = await fs.readdir(filesDir);
    console.log(files);
  } catch (error) {
    console.error('FS operation failed');
  }
};

await list();
