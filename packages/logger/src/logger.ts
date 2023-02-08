import { Logger } from 'tslog'
import type { LoggerOptions } from './types.js'

export function createLogger(options?: LoggerOptions) {
  return (name: string) => {
    const logger = new Logger({
      name,
      ...options
    })

    if (options?.rotation) {
      options.rotation(logger)
    }

    return logger
  }
}
