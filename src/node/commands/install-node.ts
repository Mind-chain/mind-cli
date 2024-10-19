import { execSync } from 'child_process';
import * as fs from 'fs-extra';
import * as os from 'os';
import { SingleBar, Presets } from 'cli-progress';
import axios from 'axios';

import { Octokit } from '@octokit/rest';

const octokit = new Octokit();

async function downloadAndInstallBinary(targetPath: string): Promise<void> {
  try {
    // Fetch the latest release instead of a specific version
    const response = await octokit.repos.getLatestRelease({
      owner: 'Mind-chain',
      repo: 'Msc-node',
    });

    const asset = response.data.assets.find(asset => asset.name === 'mind');
    if (!asset) {
      throw new Error('Binary not found in the release assets.');
    }

    const assetUrl = asset.browser_download_url;

    const totalLength = asset.size;
    const progressBar = new SingleBar({
      format: 'Downloading [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} bytes',
    }, Presets.shades_classic);

    const writer = fs.createWriteStream(targetPath);

    const responseStream = await axios({
      method: 'GET',
      url: assetUrl,
      responseType: 'stream',
    });

    // Start the progress bar when the download begins
    progressBar.start(totalLength, 0);

    responseStream.data.on('data', (chunk: Buffer) => {
      progressBar.increment(chunk.length);
      writer.write(chunk);
    });

    // Handle the end of the stream and close the progress bar
    await new Promise<void>((resolve, reject) => {
      responseStream.data.on('end', () => {
        writer.end();
        progressBar.stop();
        console.log('Binary downloaded successfully.');
        // Set execute permission
        fs.chmodSync(targetPath, '755');
        console.log('Mind installed successfully.');

        // Add a delay before executing the binary
        setTimeout(() => {
          if (os.platform() === 'linux') {
            // Display the version of the application
            execSync('./mind version', { stdio: 'inherit' });
          } else {
            console.log('MSC CORE Node CLI app is incompatible with this device. Please try Linux.');
          }
        }, 1000);
        resolve();
      });

      responseStream.data.on('error', (error: Error) => {
        progressBar.stop();
        fs.unlink(targetPath, () => {
          reject(new Error(`Failed to download file: ${error.message}`));
        });
      });
    });
  } catch (error: any) {
    throw new Error(`Failed to download file: ${error.message}`);
  }
}

function installMind(): void {
  const targetFileName = 'mind';
  const targetPath = `${process.cwd()}/${targetFileName}`;

  if (fs.existsSync(targetPath)) {
    console.log('Updating binary...');
    fs.removeSync(targetPath); // Delete the existing binary
  } else {
    console.log('Downloading binary...');
  }

  downloadAndInstallBinary(targetPath)
    .catch((error) => {
      console.error('An error occurred:', error);
    });
}

export default installMind;
