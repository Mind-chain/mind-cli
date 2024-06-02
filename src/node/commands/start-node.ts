import { spawn } from 'child_process';

// Start the Mind server
export function startMindServer(): void {
  try {
    // Start the Mind server
    const mindServerCommand =
      './mind server --data-dir=data --chain genesis.json --libp2p 0.0.0.0:10001 --nat 0.0.0.0 --jsonrpc 0.0.0.0:8545 --seal --block-gas-target 5000000000';

    console.log('Starting Mind server...');
    const mindServerProcess = spawn('sh', ['-c', mindServerCommand]);

    mindServerProcess.stdout.on('data', (data: Buffer) => {
      console.log(`Mind server stdout: ${data.toString()}`);
    });

    mindServerProcess.stderr.on('data', (data: Buffer) => {
      console.error(`Mind server stderr: ${data.toString()}`);
    });

    mindServerProcess.on('close', (code: number) => {
      if (code === 0) {
        console.log('Mind server started successfully.');
      } else {
        console.error(`Mind server process exited with code ${code}.`);
      }
    });
  } catch (error) {
    console.error('An error occurred:', (error as Error).message);
  }
}


