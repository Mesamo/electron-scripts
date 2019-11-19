import { log } from '../log';
import { formatError } from '../format-error';

const g = global as any;

function withProcessName(message: string) {
  return `[main] ${message}`;
}

const logger = {
  error(message: string, error: Error) {
    log('error', formatError(error, withProcessName(message)));
  },
  warn(message: string) {
    log('warn', withProcessName(message));
  },
  info(message: string) {
    log('info', withProcessName(message));
  },
  debug(message: string) {
    log('debug', withProcessName(message));
  }
};

g.log = logger;
