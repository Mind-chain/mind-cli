import { execSync } from 'child_process';

export function  initSecrets(): void {
  try {
      
    
    const command = `./mind secrets init --data-dir data --insecure`;

    // Print the command being executed
    console.log(`Executing command: ${command}`);

    // Execute the command and capture the output
    const result = execSync(command, { encoding: 'utf-8' });

    // Print the output of the command
    console.log(result);
  } catch (error) {
    if (error instanceof Error) {
      console.error('An error occurred:', error.message);
      if ('stderr' in error) {
        console.error('Standard Error Output:', error.stderr);
      }
    } else {
      console.error('An unknown error occurred.');
    }
  }
}