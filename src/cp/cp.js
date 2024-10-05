import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptPath = path.join(__dirname, './files/script.js');

const spawnChildProcess = async (args) => {
  const child = spawn('node', [scriptPath, ...args], {
    stdio: ['pipe', 'pipe', 'inherit'],
  });

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  process.on('SIGINT', () => {
    process.stdout.write('Exiting process...');
    process.exit();
  });

  child.on('error', (err) => {
    process.stderr.write(`Child process error: ${err.message}`);
  });

};

// Put your arguments in function call to test this functionality
spawnChildProcess(['someArgument1', 'someArgument2']);
