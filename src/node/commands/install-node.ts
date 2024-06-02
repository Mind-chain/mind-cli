import { execSync } from 'child_process';
import https from 'https';
import fs from 'fs';
import path from 'path';
import ProgressBar from 'progress';

function downloadAndInstallBinary(url: string, targetPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (
        response.statusCode === 302 &&
        response.headers.location &&
        response.headers.location.includes('github')
      ) {
        // Handle GitHub release redirection
        downloadAndInstallBinary(response.headers.location, targetPath)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(`Failed to download file, status code: ${response.statusCode}`);
        return;
      }

      const totalLength = parseInt(response.headers['content-length'] ?? '0', 10);
      const progressBar = new ProgressBar('Downloading [:bar] :percent :etas', {
        width: 20,
        total: totalLength,
      });

      const file = fs.createWriteStream(targetPath);

      response.on('data', (chunk: Buffer) => {
        progressBar.tick(chunk.length);
        file.write(chunk);
      });

      response.on('end', () => {
        file.end();
        console.log('Binary downloaded successfully.');
        // Set execute permission
        fs.chmodSync(targetPath, '755');
        console.log('Mind installed successfully.');

        // Add a delay before executing the binary
        setTimeout(() => {
          // Display the version of the application
          execSync('./mind version', { stdio: 'inherit' });
          resolve();
        }, 1000);
      });

      file.on('error', (err) => {
        fs.unlink(targetPath, () => {
          reject(`Failed to download file: ${err.message}`);
        });
      });
    }).on('error', (error) => {
      reject(`Failed to download file: ${error.message}`);
    });
  });
}

export function installMind(): void {
  const url = 'https://github.com/Mind-chain/Msc-node/releases/download/v1.0.7/mind';
  const targetFileName = 'mind';
  const targetPath = path.join(process.cwd(), targetFileName);

  console.log('Downloading binary...');

  downloadAndInstallBinary(url, targetPath)
    .then(() => {
      console.log('Binary downloaded successfully.');
      // Set execute permission
      fs.chmodSync(targetPath, '755');
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
}

