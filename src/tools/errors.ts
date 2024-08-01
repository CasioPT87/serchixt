const manageError = ({ error, message }: { error: any, message?: string }) => {
  if (error instanceof Error) {
    console.error(error.stack || error.message)
  } else {
    console.error(message || 'An unknown error occurred');
  }
}

export {
  manageError
};
