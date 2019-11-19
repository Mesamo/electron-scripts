process.on('uncaughtException', (error) => {
  log.error('Uncaught Exception', error);
});

process.on('unhandledRejection', (error) => {
  const errorMsg = JSON.stringify(error);
  log.error(`Unhandled Rejection: ${errorMsg}`);
});
