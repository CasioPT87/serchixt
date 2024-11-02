#!/bin/bash

kill -9 $(lsof -t -i:9990)

# Run dev-server in the background
npm run dev-server &

# Store the process ID
DEV_SERVER_PID=$!

# Sleep for 10 seconds and then run jest
sleep 10
jest
JEST_EXIT_CODE=$?

# Check if dev-server is still running before killing it
if kill -0 $DEV_SERVER_PID 2>/dev/null; then
    kill $DEV_SERVER_PID
else
    echo "Process $DEV_SERVER_PID is not running."
fi

echo "exited with code $JEST_EXIT_CODE"

# Exit with jest's exit code
exit $JEST_EXIT_CODE