import fs from 'fs';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToCompress = path.join(__dirname, './files/fileToCompress.txt');
const archiveFile = path.join(__dirname, './files/archive.gz');

const compress = async () => {
  const readStream = fs.createReadStream(fileToCompress);
  const writeStream = fs.createWriteStream(archiveFile);
  const gzip = zlib.createGzip();

  readStream
    .pipe(gzip)
    .pipe(writeStream)
    .on('finish', () => {
      process.stdout.write(
        `File ${fileToCompress} has been compressed to archive\n`
      );
    })
    .on('error', (error) => {
      process.stderr.write(`Error compressing: ${error.message}\n`);
    });
};

await compress();
