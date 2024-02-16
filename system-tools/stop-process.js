console.log('HOLAAAAA', process)

process.on('exit', (code) => {
    console.log(`About to exit with code ${code}`);
    // Perform cleanup tasks here
  });

process.kill(process.pid, 'SIGTERM');
process.exit(1)