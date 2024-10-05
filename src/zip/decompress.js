import fs from 'fs';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToDeCompress = path.join(__dirname, './files/archive.gz');
const fileToWrite = path.join(__dirname, './files/fileToCompress.txt');

const decompress = async () => {
  const readStream = fs.createReadStream(fileToDeCompress);
  const writeStream = fs.createWriteStream(fileToWrite);
  const gunzip = zlib.createGunzip();

  readStream
    .pipe(gunzip)
    .pipe(writeStream)
    .on('finish', () => {
      process.stdout.write(
        `File ${fileToDeCompress} has been decompressed to ${fileToWrite}\n`
      );
    })
    .on('error', (error) => {
      process.stderr.write(`Error decompressing: ${error.message}\n`);
    });
};

await decompress();
