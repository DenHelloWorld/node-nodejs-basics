import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filesDir = path.join(__dirname, 'files');
  const filesCopyDir = path.join(__dirname, 'files_copy');

  const srcExists = await fs
    .access(filesDir)
    .then(() => true)
    .catch(() => false);

  const dstExists = await fs
    .access(filesCopyDir)
    .then(() => true)
    .catch(() => false);

  if (!srcExists || dstExists) {
    throw new Error('FS operation failed');
  }

  await fs.mkdir(filesCopyDir);

  const files = await fs.readdir(filesDir);

  await Promise.all(
    files.map((file) =>
      fs.copyFile(path.join(filesDir, file), path.join(filesCopyDir, file))
    )
  );
};

await copy()
  .then(() => {
    process.stdout.write('Succesfull');
  })
  .catch((e) => {
    process.stderr.write(e.message);
  });
