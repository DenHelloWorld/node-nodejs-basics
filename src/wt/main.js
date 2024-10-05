import { Worker } from 'worker_threads';
import os from 'os';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
  const numCores = os.cpus().length;
  const result = [];
  const workerPromises = Array.from({ length: numCores }, (_, index) => {
    return new Promise((resolve) => {
      const worker = new Worker(path.resolve(__dirname, './worker.js'));

      worker.postMessage(10 + index);

      worker.on('message', (message) => {
        result[index] = message;
        resolve();
        worker.terminate();
      });

      worker.on('error', () => {
        result[index] = { status: 'error', data: null };
        resolve();
        worker.terminate();
      });
    });
  });

  await Promise.all(workerPromises);

  process.stdout.write(JSON.stringify(result, null, 2) + '\n');
};

await performCalculations();
