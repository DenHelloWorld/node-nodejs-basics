import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filesDir = path.join(__dirname, 'files');
  const oldFilePath = path.join(filesDir, 'wrongFilename.txt');
  const newFilePath = path.join(filesDir, 'properFilename.md');

  const oldFileExists = fs
    .access(oldFilePath)
    .then(() => true)
    .catch(() => false);

  const newFileExists = fs
    .access(newFilePath)
    .then(() => true)
    .catch(() => false);

  const [oldExists, newExists] = await Promise.all([
    oldFileExists,
    newFileExists,
  ]);

  if (!oldExists) {
    console.error('FS operation failed');
    return;
  }

  if (newExists) {
    console.error('FS operation failed');
    return;
  }

  await fs.rename(oldFilePath, newFilePath);
  console.log('File renamed');
};

await rename();
