// import { createStream } from 'rotating-file-stream'
import { Logger } from 'tslog'
import type { LoggerOptions } from './types.js'

export function createLogger(options?: LoggerOptions) {
  return (name: string) => {
    const logger = new Logger({
      name,
      ...options
    })

    // if (options?.rotation) {
    //   const stream = createStream(options.rotation.path, options.rotation)

    //   logger.attachTransport((log) => {
    //     stream.write(JSON.stringify(log) + '\n')
    //   })
    // }

    return logger
  }
}
