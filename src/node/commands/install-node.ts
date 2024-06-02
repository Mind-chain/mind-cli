import { execSync } from 'child_process';
import * as fs from 'fs-extra';
import { SingleBar, Presets } from 'cli-progress';
import axios from 'axios';

import { Octokit } from '@octokit/rest';

const octokit = new Octokit();

async function downloadAndInstallBinary(url: string, targetPath: string): Promise<void> {
  try {
    const response = await octokit.repos.getReleaseByTag({
      owner: 'Mind-chain',
      repo: 'Msc-node',
      tag: 'v1.0.7'
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

    progressBar.start(totalLength, 0);

    const writer = fs.createWriteStream(targetPath);

    const responseStream = await axios({
      method: 'GET',
      url: assetUrl,
      responseType: 'stream',
    });

    responseStream.data.on('data', (chunk: Buffer) => {
      progressBar.increment(chunk.length);
      writer.write(chunk);
    });

    responseStream.data.on('end', () => {
      writer.end();
      progressBar.stop();
      console.log('Binary downloaded successfully.');
      // Set execute permission
      fs.chmodSync(targetPath, '755');
      console.log('Mind installed successfully.');

      // Add a delay before executing the binary
      setTimeout(() => {
        // Display the version of the application
        execSync('./mind version', { stdio: 'inherit' });
      }, 1000);
    });

    responseStream.data.on('error', (error: Error) => {
      progressBar.stop();
      fs.unlink(targetPath, () => {
        throw new Error(`Failed to download file: ${error.message}`);
      });
    });
  } catch (error:any) {
    throw new Error(`Failed to download file: ${error.message}`);
  }
}

function installMind(): void {
  const targetFileName = 'mind';
  const targetPath = `${process.cwd()}/${targetFileName}`;

  console.log('Downloading binary...');

  downloadAndInstallBinary('', targetPath)
    .then(() => {
      console.log('Binary downloaded successfully.');
      // Set execute permission
      fs.chmodSync(targetPath, '755');
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
}

export default installMind;
