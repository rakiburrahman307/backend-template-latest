import { logger } from "../shared/logger";
import { gracefulShutdown } from "./shutdown";
import colors from 'colors';

// Set up process event handlers for graceful shutdown
export function setupProcessHandlers() {
  process.on('uncaughtException', (error) => {
    logger.error(colors.red('Uncaught Exception:'), error);
    gracefulShutdown('uncaughtException');
  });
  process.on('unhandledRejection', (reason, promise) => {
    logger.error(colors.red('Unhandled Rejection at:'), promise, 'reason:', reason);
    gracefulShutdown('unhandledRejection');
  });
  process.on('SIGINT', () => {
    gracefulShutdown('SIGINT');
  });

  process.on('SIGTERM', () => {
    gracefulShutdown('SIGTERM');
  });

  process.on('SIGUSR2', () => {
    gracefulShutdown('SIGUSR2');
  });

}
