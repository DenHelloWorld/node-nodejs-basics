import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const remove = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filesDir = path.join(__dirname, 'files');
  const fileToRemovePath = path.join(filesDir, 'fileToRemove.txt');

  try {
    await fs.access(fileToRemovePath);
  } catch {
    console.error('FS operation failed');
    return;
  }

  await fs.unlink(fileToRemovePath);
  console.log('File removed');
};

await remove();
