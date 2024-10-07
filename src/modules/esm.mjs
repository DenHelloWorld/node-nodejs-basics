import path from 'path';
import fs from 'fs/promises';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import { fileURLToPath } from 'url';
import './files/c.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const server = createServerHttp((_, res) => {
  res.end('Request accepted');
});
const PORT = 3000;

const loadJson = async (module) => {
  const filePath = module === 'a' ? './files/a.json' : './files/b.json';
  const filesDir = path.join(__dirname, filePath);
  try {
    const data = JSON.parse(await fs.readFile(filesDir, 'utf-8'));
    return data;
  } catch (error) {
    console.error(`Error loading JSON from ${filesDir}: ${error.message}`);
    return null;
  }
};

const getAOrBData = async () => {
  const random = Math.random();
  return random > 0.5 ? await loadJson('a') : await loadJson('b');
};

const logInfo = async () => {
  const data = await getAOrBData();
  process.stdout.write(
    `Release ${release()}\n` +
      `Version ${version()}\n` +
      `Path segment separator is "${path.sep}"\n` +
      `Path to current file is ${__filename}\n` +
      `Path to current directory is ${__dirname}\n`
  );
  process.stdout.write(
    `Data: ${JSON.stringify(data, null, 2) || 'No data loaded'}\n`
  );
};

server.listen(PORT, () => {
  process.stdout.write(
    `Server is listening on port ${PORT}\n` +
      'To terminate it, use Ctrl+C combination\n'
  );
});

logInfo().catch((error) => {
  process.stderr(`Error in logInfo: ${error.message}`);
});
