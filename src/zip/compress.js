import fs from 'fs';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToCompress = path.join(__dirname, './files/fileToCompress.txt');
const archive = path.join(__dirname, './files/archive.gz');
const readStream = fs.createReadStream(fileToCompress);
const writeStream = fs.createWriteStream(archive);
const gzipStream = zlib.createGzip();

const compress = async () => {
  readStream
    .pipe(gzipStream)
    .pipe(writeStream)
    .on('finish', () => {
      process.stdout.write(
        `File ${fileToCompress} has been compressed to ${archive}`
      );
    })
    .on('error', (error) => {
      process.stderr.write(`Error compress: ${error.message}`);
    });
};

await compress();
